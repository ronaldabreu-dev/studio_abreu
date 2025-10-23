import fs from 'fs';
import path from 'path';
import { useMemo, useRef, useState } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Media.module.css';

// const videos = [
//   {
//     id: 'performance',
//     title: 'Carey in Performance',
//     description: 'A sweeping aria captured in vivid detail with cinematic staging.',
//     meta: 'Opera Highlights',
//     duration: '04:32',
//     background:
//       'linear-gradient(135deg, rgba(34, 34, 34, 0.7), rgba(191, 174, 92, 0.5)), url(/placeholder.jpg)',
//   },
//   {
//     id: 'recital',
//     title: 'Recital Moments',
//     description: 'Intimate selections from the recital stage that spotlight lyrical nuance.',
//     meta: 'Recital Preview',
//     duration: '03:18',
//     background:
//       'linear-gradient(135deg, rgba(34, 34, 34, 0.7), rgba(243, 231, 180, 0.5)), url(/placeholder.jpg)',
//   },
//   {
//     id: 'studio',
//     title: 'Studio Session',
//     description: 'Behind-the-scenes footage from a recent recording session.',
//     meta: 'Studio Session',
//     duration: '02:54',
//     background:
//       'linear-gradient(135deg, rgba(34, 34, 34, 0.7), rgba(245, 177, 4, 0.35)), url(/placeholder.jpg)',
//   },
//   {
//     id: 'orchestra',
//     title: 'With Orchestra',
//     description: 'A powerful collaboration with full orchestra and chorus.',
//     meta: 'Symphonic Feature',
//     duration: '05:06',
//     background:
//       'linear-gradient(135deg, rgba(34, 34, 34, 0.7), rgba(179, 129, 58, 0.5)), url(/placeholder.jpg)',
//   },
//   {
//     id: 'spotlight',
//     title: 'Spotlight Interview',
//     description: 'Conversation and performance highlights from a recent feature.',
//     meta: 'Artist Interview',
//     duration: '06:12',
//     background:
//       'linear-gradient(135deg, rgba(34, 34, 34, 0.7), rgba(227, 204, 126, 0.45)), url(/placeholder.jpg)',
//   },
// ];
const videos = [];
const soundcloudItems = [
  {
    type: 'track',
    id: '2169205494',
    title: 'Beethoven - An die ferne Geliebte, Op. 98',
  },
  {
    type: 'track',
    id: '2175954663',
    title: 'Mein schöner Stern – Marlboro Music Festival 2025',
  },
  {
    type: 'track',
    id: '1944724639',
    title: "Stravinsky, Pulcinella: Mentre L'erbetta - Gewandhaus",
  },
  {
    type: 'track',
    id: '1916375684',
    title: 'Bach Magnificat - Deposuit Potentes | Carnegie Hall',
  },
  {
    type: 'track',
    id: '1646489547',
    title: 'Balliet - Beast Fights - Boston Symphony Orchestra',
  },
  {
    type: 'track',
    id: '692610553',
    title: 'Erlkönig',
  },
  {
    type: 'track',
    id: '668713493',
    title: 'Cinco canciones populares argentinas, Op. 10 - 2. Triste',
  },
];

const SOUND_CLOUD_COLOR = encodeURIComponent('#bfae5c');

const buildSoundCloudSrc = item => {
  const resourceType = item.type === 'playlist' ? 'playlists' : 'tracks';
  const resourceUrl = `https://api.soundcloud.com/${resourceType}/${item.id}`;
  const params = [
    `url=${encodeURIComponent(resourceUrl)}`,
    `color=${SOUND_CLOUD_COLOR}`,
    'inverse=false',
    'auto_play=false',
    'show_user=true',
  ];

  if (item.type === 'playlist') {
    params.push('visual=true');
  } else {
    params.push('hide_related=false', 'show_teaser=true');
  }

  return `https://w.soundcloud.com/player/?${params.join('&')}`;
};

export default function Media({ images }) {
  const [activeVideo, setActiveVideo] = useState(() =>
    videos.length > 0 ? videos[0] : null,
  );
  const [selectedImage, setSelectedImage] = useState(null);
  const carouselRef = useRef(null);

  const otherVideos = useMemo(() => {
    if (!activeVideo) return [];
    return videos.filter(video => video.id !== activeVideo.id);
  }, [activeVideo]);

  const scrollCarousel = direction => {
    const container = carouselRef.current;
    if (!container) return;

    const amount = container.offsetWidth * 0.8;
    container.scrollBy({
      left: direction === 'next' ? amount : -amount,
      behavior: 'smooth',
    });
  };

  return (
    <Layout title="Media">
      <main className={styles.main}>
        <section
          className={`${styles.hero} parallaxBackground`}
          data-parallax-zoom="1"
          data-parallax-fit="width"
          data-parallax-focus-y="52"
          data-parallax-offset="20"
          data-parallax-speed="0.3"
          data-parallax-mobile-fit="height"   
          data-parallax-mobile-focus-y="60"
          data-parallax-mobile-speed="0.12"
          data-parallax-mobile-offset="0"
          data-parallax-mobile-img-zoom="0.6"
        >
          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>Eric Finbarr Carey's</p>
            <h1 className={styles.heroTitle}>Media</h1>
            <p className={styles.heroSubtitle}>
              Explore video, audio, and photos of Mr. Carey.
            </p>
          </div>
        </section>
        {videos.length > 0 && activeVideo && (
          <section className={`${styles.section} ${styles.videoSection}`}>
            <h2 className={styles.sectionTitle}>Video</h2>
            <div className={styles.featuredVideo}>
              <div
                className={styles.featuredThumbnail}
                style={{ backgroundImage: activeVideo.background }}
              >
                <button type="button" className={styles.playButton}>
                  Play Video
                </button>
              </div>
              <div className={styles.featuredContent}>
                <span className={styles.videoMeta}>{activeVideo.meta}</span>
                <h3>{activeVideo.title}</h3>
                <p>{activeVideo.description}</p>
                <span className={styles.videoDuration}>Duration {activeVideo.duration}</span>
              </div>
            </div>

            <div className={styles.carousel}>
              <button
                type="button"
                className={styles.carouselControl}
                onClick={() => scrollCarousel('prev')}
                aria-label="Scroll previous videos"
              >
                ‹
              </button>
              <div className={styles.carouselTrack} ref={carouselRef}>
                {videos.map(video => (
                  <button
                    key={video.id}
                    type="button"
                    className={`${styles.carouselItem} ${
                      video.id === activeVideo.id ? styles.carouselItemActive : ''
                    }`}
                    onClick={() => setActiveVideo(video)}
                  >
                    <div
                      className={styles.carouselThumb}
                      style={{ backgroundImage: video.background }}
                    />
                    <div className={styles.carouselText}>
                      <span>{video.meta}</span>
                      <p>{video.title}</p>
                    </div>
                  </button>
                ))}
              </div>
              <button
                type="button"
                className={styles.carouselControl}
                onClick={() => scrollCarousel('next')}
                aria-label="Scroll next videos"
              >
                ›
              </button>
            </div>

            <div className={styles.videoGrid}>
              {otherVideos.map(video => (
                <article key={video.id} className={styles.videoCard}>
                  <div
                    className={styles.videoCardThumb}
                    style={{ backgroundImage: video.background }}
                  />
                  <div className={styles.videoCardBody}>
                    <span className={styles.videoMeta}>{video.meta}</span>
                    <h4>{video.title}</h4>
                    <p>{video.description}</p>
                    <button
                      type="button"
                      onClick={() => setActiveVideo(video)}
                      className={styles.videoLink}
                    >
                      View Feature
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className={`${styles.section} ${styles.audioSection}`}>
          <h2 className={styles.sectionTitle}>Audio</h2>
          <p className={styles.audioIntro}>
            Listen to selections from recent performances, including favorites from Mr.
            Carey’s operatic and recital repertoire.
          </p>
          <div className={styles.audioList}>
            {soundcloudItems.map(item => (
              <article key={item.id} className={styles.audioItem}>
                <h3>{item.title}</h3>
                <iframe
                  title={`${item.title} SoundCloud player`}
                  width="100%"
                  height={item.type === 'playlist' ? '450' : '166'}
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src={buildSoundCloudSrc(item)}
                ></iframe>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.gallerySection}`}>
          <h2 className={styles.sectionTitle}>Gallery</h2>
          <p className={styles.galleryIntro}>
            Production stills, portraits, and candid moments from the stage and beyond.
          </p>
          <div className={styles.galleryGrid}>
            {images.map((src, idx) => (
              <div key={idx} className={`fade-in ${styles.galleryItem}`}>
                <img
                  src={src}
                  alt={`Photo ${idx + 1}`}
                  loading="lazy"
                  onClick={() => setSelectedImage(src)}
                />
              </div>
            ))}
          </div>

          {selectedImage && (
            <button
              type="button"
              className={styles.lightbox}
              onClick={() => setSelectedImage(null)}
              aria-label="Close image preview"
            >
              <img src={selectedImage} alt="Enlarged view" />
            </button>
          )}
        </section>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const imagesDir = path.join(process.cwd(), 'public/gallery');
  let images = [];

  if (fs.existsSync(imagesDir)) {
    images = fs
      .readdirSync(imagesDir)
      .filter(name => /\.(jpe?g|png|gif)$/i.test(name))
      .filter(name => !name.includes(' '))
      .map(name => `/gallery/${name}`);
  }

  return { props: { images } };
}
