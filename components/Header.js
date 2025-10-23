import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Header.module.css';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'Approach' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 32) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [router.pathname]);

  return (
    <header className={`${styles.header}${scrolled ? ' ' + styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link href="/" className="logo">
          <span className={styles.wordmark}>Studio Abreu</span>
        </Link>
        <button
          className={styles.navToggle}
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
        <nav className={`${styles.nav} ${open ? styles.navOpen : ''}`}>
          <ul>
            {NAV_ITEMS.map(item => (
              <li key={item.href}>
                <Link href={item.href} className={router.pathname === item.href ? styles.active : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.metaLinks}>
            <a href="mailto:hello@studioabreu.com">hello@studioabreu.com</a>
            <a href="https://instagram.com/studioabreu" target="_blank" rel="noopener noreferrer">
              Instagram ↗
            </a>
          </div>
        </nav>
        <Link href="/contact" className={styles.headerCta}>
          Book a call
        </Link>
      </div>
    </header>
  );
}
