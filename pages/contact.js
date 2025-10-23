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
      concept: form.get('concept'),
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
    <Layout title="Contact" description="Start a conversation with Studio Abreu about your restaurant website.">
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.heroEyebrow}>Work with Studio Abreu</p>
            <h1>Let’s make your restaurant the obvious choice.</h1>
            <p>
              Share your concept, neighbourhood, and the momentum you want from your site. Daniel responds personally within one business day.
            </p>
            <div className={styles.contactMeta}>
              <span>hello@studioabreu.com</span>
              <span>Newark · Remote worldwide</span>
            </div>
          </div>
        </section>

        <section className={styles.formSection}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.field}>
              Name
              <input type="text" name="name" required />
            </label>
            <label className={styles.field}>
              Email
              <input type="email" name="email" required />
            </label>
            <label className={styles.field}>
              Concept or restaurant name
              <input type="text" name="concept" required />
            </label>
            <label className={styles.field}>
              Tell me about your goals
              <textarea name="message" rows="5" required />
            </label>
            <button type="submit" className={styles.submitButton}>Send message</button>
            {status === 'success' && <p className={styles.statusSuccess}>Message sent. Expect a reply within one business day.</p>}
            {status === 'error' && <p className={styles.statusError}>Something went wrong. Please email hello@studioabreu.com.</p>}
          </form>
        </section>
      </main>
    </Layout>
  );
}
