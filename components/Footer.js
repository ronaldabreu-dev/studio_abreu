
export default function Footer() {
  return (
    <footer className="footer">
      <div className="social-links">
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
      <div>
        Eric Finbarr Carey TENOR © {new Date().getFullYear()} ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}
