
import { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Contact.module.css';

export default function Contact() {
  const [status, setStatus] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    const form = new FormData(e.target);
    const payload = {
      name: form.get('name'),
      email: form.get('email'),
      subject: form.get('subject'),
      message: form.get('message'),
    };
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) e.target.reset();
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <Layout title="Contact">
      <main className={styles.main}>
        <section
          className={`${styles.hero} parallaxBackground`}
          data-parallax-zoom="1"
          data-parallax-fit="width"
          data-parallax-focus-y="62"
          data-parallax-offset="30"
          data-parallax-mobile-fit="width"   
          data-parallax-mobile-focus-y="71"
          data-parallax-mobile-speed="0.12"
          data-parallax-mobile-offset="0"
          data-parallax-mobile-img-zoom="1.8"
        >
          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>Connect</p>
            <h1 className={styles.heroTitle}>Contact</h1>
            <p className={styles.heroSubtitle}>
              For bookings, collaborations, or press inquiries, reach out to
              Eric Finbarr Carey and his management team.
            </p>
          </div>
        </section>

        <section className={`fade-in ${styles.managementSection}`}>
          <div className={styles.managementIntro}>
            <p className={styles.managementEyebrow}>Representation</p>
            <h2 className={styles.managementTitle}>TACT Artists Management</h2>
            <p>
              Eric Finbarr Carey is represented worldwide by TACT Artists Management.
              Please contact his team for booking, media, and collaboration
              inquiries.
            </p>
            <div className={styles.managementBadge}>Worldwide Exclusive Representation</div>
          </div>
          <div className={styles.managementGrid}>
            <div className={styles.managerCard}>
              <h3 className={styles.managerName}>Oliver Kretschmer</h3>
              <p className={styles.managerTitle}>TACT Artists Management</p>
              <div className={styles.managerLinks}>
                <a href="mailto:oliver@tact4art.com">oliver@tact4art.com</a>
                <a href="tel:+491702230823">+49 170 22 30 823</a>
              </div>
            </div>
            <div className={styles.managerCard}>
              <h3 className={styles.managerName}>Kristina Stefanova</h3>
              <p className={styles.managerTitle}>TACT Artists Management</p>
              <div className={styles.managerLinks}>
                <a href="mailto:kristina@tact4art.com">kristina@tact4art.com</a>
              </div>
            </div>
          </div>
          <a
            className={styles.managementProfileLink}
            href="https://tact4art.com/profile/EricFinbarrCarey"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Eric Finbarr Carey's profile on TACT Artists Management ↗
          </a>
        </section>

        <section className={`fade-in ${styles.formSection}`}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Get in touch</h2>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="text" name="subject" placeholder="Subject" required />
            <textarea name="message" rows="5" placeholder="Message" required />
            <button type="submit">Send</button>
            {status === 'success' && <p>Message sent!</p>}
            {status === 'error' && <p>There was an error sending your message.</p>}
          </form>
        </section>
      </main>
    </Layout>
  );
}
