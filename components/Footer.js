export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span>Studio Abreu</span>
          <p>Handcrafted hospitality websites built for trust.</p>
        </div>
        <div className="footer-links">
          <a href="mailto:hello@studioabreu.com">hello@studioabreu.com</a>
          <a href="https://instagram.com/studioabreu" target="_blank" rel="noopener noreferrer">
            Instagram ↗
          </a>
        </div>
        <div className="footer-meta">
          <span>© {new Date().getFullYear()} Studio Abreu. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
