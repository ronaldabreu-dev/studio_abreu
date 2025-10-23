import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Header.module.css';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const forceScrolled = router.pathname === '/calendar/[slug]';

  useEffect(() => {
    if (forceScrolled) {
      setScrolled(true);
      return;
    }

    const onScroll = () => {
      // 60vh is the height of the hero section
      if (window.scrollY > window.innerHeight * 0.6) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [forceScrolled]);

  return (
    <header className={`${styles.header}${scrolled ? ' ' + styles.scrolled : ''}`}>
      <Link href="/" className="logo">ERIC FINBARR CAREY |  TENOR</Link>
      <button
        className={styles.navToggle}
        aria-label="Toggle Menu"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>
      <nav className={`${styles.nav} ${open ? styles.navOpen : ''}`}>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/calendar">Calendar</Link></li>
          <li><Link href="/media">Media</Link></li>
          <li><Link href="/press">Press</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>
      <div className={styles.socialLinks}>
        <a
          href="https://soundcloud.com/user-334949814"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="SoundCloud"
        >
          <i className="fab fa-soundcloud"></i>
        </a>
        <a
          href="https://instagram.com/finbarrcalamitousec"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </header>
  );
}
