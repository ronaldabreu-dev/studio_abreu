/* scroll.js — parallax with transform-zoom + img-zoom, fit (+mobile), focusY (+mobile), overscan + clamp */
/* eslint-disable no-console */
(() => {
  const DEBUG = false;

  let fadeInItems = document.querySelectorAll('.fade-in');
  let parallaxHosts = document.querySelectorAll('.parallaxBackground');
  const stateByEl = new WeakMap();

  let rafId = null;
  let lastTs = null;
  let needsMeasure = true;
  let scrollY = window.scrollY;

  const mobileQuery = window.matchMedia('(max-width: 768px)');
  let isMobile = mobileQuery.matches;
  let pendingInit = false;

  const SMOOTHING = 0.16;
  const MAX_FRAME_MS = 32;
  const SAFETY_PX = 200;
  const CLAMP_MARGIN = 8;
  const ROOT_MARGIN = '0px 0px -10% 0px';

  const SPEED_DEFAULT = 0.30;
  const OFFSET_DEFAULT = 0;
  const ZOOM_DEFAULT = 1;        // transform scale
  const IMG_ZOOM_DEFAULT = 1;    // background-size multiplier
  const FIT_DEFAULT = 'cover';
  const FOCUS_Y_DEFAULT = 50;

  /* -------- IntersectionObserver (safe) -------- */
  let io = null;
  const getObserver = () => {
    if (io) return io;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        entries => {
          entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
          });
        },
        { threshold: 0.1, rootMargin: ROOT_MARGIN }
      );
    } else {
      io = { observe: el => el.classList.add('visible'), unobserve: () => {} };
    }
    return io;
  };

  /* ---------------- utils ---------------- */
  const toNumber = v => { const n = parseFloat(v); return Number.isNaN(n) ? null : n; };
  const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);
  const normalizeFit = fit => {
    const f = String(fit || '').toLowerCase();
    return (f === 'contain' || f === 'height' || f === 'width' || f === 'cover') ? f : FIT_DEFAULT;
  };

  const applyFitAndImgZoom = (layer, fit, imgZoom) => {
    // imgZoom only meaningful with width/height fits (percent-based sizing).
    const pct = Math.round((imgZoom || 1) * 100);
    if (fit === 'contain') {
      layer.style.backgroundSize = 'contain';
      return;
    }
    if (fit === 'height') {
      layer.style.backgroundSize = `auto ${pct}%`;
      return;
    }
    if (fit === 'width') {
      layer.style.backgroundSize = `${pct}% auto`;
      return;
    }
    // cover: leave sizing to 'cover'; use transform zoom for “see more”.
    layer.style.backgroundSize = 'cover';
  };

  /* ------------- read config (desktop + mobile) ------------- */
  const readConfig = el => {
    // desktop
    const speedAttr   = toNumber(el.dataset.parallaxSpeed);
    const offsetAttr  = toNumber(el.dataset.parallaxOffset);
    const zoomAttr    = toNumber(el.dataset.parallaxZoom);          // transform scale
    const imgZoomAttr = toNumber(el.dataset.parallaxImgZoom);       // background-size %
    const fitAttr     = normalizeFit(el.dataset.parallaxFit);
    const focusYAttr  = toNumber(el.dataset.parallaxFocusY);

    // mobile
    const mSpeedAttr   = toNumber(el.dataset.parallaxMobileSpeed);
    const mOffsetAttr  = toNumber(el.dataset.parallaxMobileOffset);
    const mZoomAttr    = toNumber(el.dataset.parallaxMobileZoom);
    const mImgZoomAttr = toNumber(el.dataset.parallaxMobileImgZoom);
    const mFitAttr     = el.dataset.parallaxMobileFit ? normalizeFit(el.dataset.parallaxMobileFit) : null;
    const mFocusAttr   = toNumber(el.dataset.parallaxMobileFocusY);

    const base = {
      speed:  speedAttr  === null ? SPEED_DEFAULT : speedAttr,
      offset: offsetAttr === null ? OFFSET_DEFAULT : offsetAttr,
      zoom:   clamp(zoomAttr === null ? ZOOM_DEFAULT : zoomAttr, 0.5, 2),
      imgZoom: clamp(imgZoomAttr === null ? IMG_ZOOM_DEFAULT : imgZoomAttr, 0.25, 3),
      fit:    fitAttr,
      focusY: clamp(Number.isFinite(focusYAttr) ? focusYAttr : FOCUS_Y_DEFAULT, 0, 100),
    };

    const mobile = {
      speed:  mSpeedAttr   === null ? base.speed  : mSpeedAttr,
      offset: mOffsetAttr  === null ? base.offset : mOffsetAttr,
      zoom:   clamp(mZoomAttr === null ? base.zoom : mZoomAttr, 0.5, 2),
      imgZoom: clamp(mImgZoomAttr === null ? base.imgZoom : mImgZoomAttr, 0.25, 3),
      fit:    mFitAttr || base.fit,
      focusY: clamp(Number.isFinite(mFocusAttr) ? mFocusAttr : base.focusY, 0, 100),
    };

    return { base, mobile };
  };

  const pickActiveConfig = cfg => (isMobile ? cfg.mobile : cfg.base);

  /* ------------- layer creation ------------- */
  const ensureLayer = el => {
    let rec = stateByEl.get(el);
    if (rec?.layer) return rec.layer;

    const layer = document.createElement('div');
    layer.className = 'parallaxLayer';

    const cs = getComputedStyle(el);
    const bgImage  = cs.backgroundImage;
    const bgSize   = cs.backgroundSize || 'cover';
    const bgRepeat = cs.backgroundRepeat || 'no-repeat';
    const bgPos    = cs.backgroundPosition || 'center';
    const bgColor  = cs.backgroundColor;

    el.style.background = 'none';
    el.style.position = el.style.position || 'relative';
    el.style.overflow = el.style.overflow || 'hidden';
    if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)') el.style.backgroundColor = bgColor;

    Object.assign(layer.style, {
      position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,
      backgroundImage: bgImage, backgroundRepeat: bgRepeat,
      backgroundPosition: bgPos, backgroundSize: bgSize,
      willChange: 'transform', transformOrigin: 'center',
      transform: 'translate3d(0,0,0) scale(1)'
    });

    const initialFY = (stateByEl.get(el)?.focusY ?? FOCUS_Y_DEFAULT);
    layer.style.backgroundPositionX = 'center';
    layer.style.backgroundPositionY = initialFY + '%';

    el.appendChild(layer);
    if (!rec) rec = { current: 0, target: 0, focusY: initialFY };
    rec.layer = layer;
    stateByEl.set(el, rec);

    if (DEBUG && (!bgImage || bgImage === 'none')) {
      console.warn('[parallax] host has no background image', el);
    }
    return layer;
  };

  /* ------------- measure/layout ------------- */
  const measure = () => {
    parallaxHosts.forEach(el => {
      const layer = ensureLayer(el);
      const rect = el.getBoundingClientRect();
      const cfgAll = readConfig(el);
      const cfg = pickActiveConfig(cfgAll);

      const top = rect.top + window.scrollY;
      const height = rect.height;
      const viewport = window.innerHeight;

      const travel = (height + viewport) * Math.abs(cfg.speed);
      const overscan = Math.ceil((travel + Math.abs(cfg.offset)) / cfg.zoom) + SAFETY_PX;

      layer.style.inset = `-${overscan}px 0`;
      applyFitAndImgZoom(layer, cfg.fit, cfg.imgZoom);

      const y = `${cfg.focusY}%`;
      layer.style.backgroundPosition = `center ${y}`;
      layer.style.backgroundPositionX = 'center';
      layer.style.backgroundPositionY = y;
      layer.style.setProperty('--pfy', y);
      el.style.setProperty('--pfy', y);

      const rec = stateByEl.get(el) || {};
      rec.top = top;
      rec.height = height;
      rec.viewport = viewport;
      rec.speed = cfg.speed;
      rec.offset = cfg.offset;
      rec.zoom = cfg.zoom;         // transform scale
      rec.imgZoom = cfg.imgZoom;   // background-size multiplier (used above)
      rec.fit = cfg.fit;
      rec.focusY = cfg.focusY;
      rec.overscan = overscan;
      rec.minY = -overscan + CLAMP_MARGIN;
      rec.maxY =  overscan - CLAMP_MARGIN;
      rec.current = rec.current ?? 0;
      rec.target = 0;
      rec.layer = layer;
      rec.config = cfgAll;
      rec.profile = isMobile ? 'mobile' : 'desktop';
      stateByEl.set(el, rec);

      if (DEBUG) {
        console.log('[parallax][measure]', {
          profile: rec.profile, fit: rec.fit,
          zoom: rec.zoom, imgZoom: rec.imgZoom, focusY: rec.focusY,
          offset: rec.offset, height: rec.height, overscan: rec.overscan
        });
      }
    });

    needsMeasure = false;
  };

  /* ------------- compute + animate ------------- */
  const computeTargets = () => {
    parallaxHosts.forEach(el => {
      const r = stateByEl.get(el);
      if (!r) return;
      const yIn = scrollY - r.top;
      r.target = clamp(yIn * -r.speed + r.offset, r.minY, r.maxY);
    });
  };

  const animate = dt => {
    let anyMoving = false;
    parallaxHosts.forEach(el => {
      const r = stateByEl.get(el);
      if (!r) return;
      const layer = r.layer || ensureLayer(el);
      const delta = r.target - r.current;

      if (SMOOTHING === 0) {
        r.current = r.target;
      } else {
        const dtClamped = dt > MAX_FRAME_MS ? MAX_FRAME_MS : dt;
        const k = 1 - Math.exp(-(dtClamped * SMOOTHING) / 16.67);
        r.current += delta * k;
        if (Math.abs(delta) > 0.2) anyMoving = true;
      }

      // transform zoom (works with any fit; use imgZoom for width/height)
      layer.style.transform = `translate3d(0,${r.current}px,0) scale(${r.zoom})`;
      layer.style.backgroundPositionY = `${r.focusY}%`;
    });
    return anyMoving;
  };

  /* ------------- RAF loop ------------- */
  const tick = ts => {
    if (lastTs === null) lastTs = ts;
    const dt = ts - lastTs;
    lastTs = ts;

    if (needsMeasure) measure();
    computeTargets();

    const moving = animate(dt);
    if (moving) rafId = requestAnimationFrame(tick);
    else { rafId = null; lastTs = null; }
  };

  const start = () => { if (rafId === null) rafId = requestAnimationFrame(tick); };

  /* ------------- events ------------- */
  const onScroll = () => { scrollY = window.scrollY; start(); };
  const onResize = () => { const m = mobileQuery.matches; if (m !== isMobile) isMobile = m; needsMeasure = true; start(); };
  const onBreakpointChange = e => { if (e.matches === isMobile) return; isMobile = e.matches; needsMeasure = true; start(); };

  /* ------------- init ------------- */
  const init = () => {
    fadeInItems = document.querySelectorAll('.fade-in');
    parallaxHosts = document.querySelectorAll('.parallaxBackground');

    const obs = getObserver();
    fadeInItems.forEach(el => obs.observe(el));
    parallaxHosts.forEach(el => ensureLayer(el));

    needsMeasure = true;
    scrollY = window.scrollY;
    start();

    if (DEBUG) console.log('[parallax] hosts:', parallaxHosts.length);
  };

  const disableIfReducedMotion = () => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mq || !mq.matches) return;

    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
    if (mobileQuery.removeEventListener) mobileQuery.removeEventListener('change', onBreakpointChange);
    else if (mobileQuery.removeListener) mobileQuery.removeListener(onBreakpointChange);

    parallaxHosts.forEach(el => {
      const r = stateByEl.get(el);
      if (r?.layer) r.layer.style.transform = 'translate3d(0,0,0) scale(1)';
    });
  };

  /* ------------- wire-up ------------- */
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
  if (mobileQuery.addEventListener) mobileQuery.addEventListener('change', onBreakpointChange);
  else if (mobileQuery.addListener) mobileQuery.addListener(onBreakpointChange);

  init();
  disableIfReducedMotion();

  /* ------------- re-init on Next.js DOM changes ------------- */
  const appRoot = document.getElementById('__next');
  if (appRoot) {
    const mo = new MutationObserver(muts => {
      let needs = false;
      for (const m of muts) {
        if (m.type === 'childList') { needs = true; break; }
        if (m.type === 'attributes') {
          const a = m.attributeName;
          if (
            a === 'class' ||
            a === 'data-parallax-speed' ||
            a === 'data-parallax-offset' ||
            a === 'data-parallax-mobile-speed' ||
            a === 'data-parallax-mobile-offset' ||
            a === 'data-parallax-zoom' ||
            a === 'data-parallax-mobile-zoom' ||
            a === 'data-parallax-img-zoom' ||
            a === 'data-parallax-mobile-img-zoom' ||
            a === 'data-parallax-fit' ||
            a === 'data-parallax-mobile-fit' ||
            a === 'data-parallax-focus-y' ||
            a === 'data-parallax-mobile-focus-y'
          ) { needs = true; break; }
        }
      }
      if (needs && !pendingInit) {
        pendingInit = true;
        requestAnimationFrame(() => { pendingInit = false; init(); });
      }
    });
    mo.observe(appRoot, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: [
        'class',
        'data-parallax-speed',
        'data-parallax-offset',
        'data-parallax-mobile-speed',
        'data-parallax-mobile-offset',
        'data-parallax-zoom',
        'data-parallax-mobile-zoom',
        'data-parallax-img-zoom',
        'data-parallax-mobile-img-zoom',
        'data-parallax-fit',
        'data-parallax-mobile-fit',
        'data-parallax-focus-y',
        'data-parallax-mobile-focus-y'
      ]
    });
  }
})();
