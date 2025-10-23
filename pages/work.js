import Layout from '../components/Layout';
import Link from 'next/link';
import styles from '../styles/Work.module.css';

const projects = [
  {
    name: 'Cora & Finch',
    location: 'Philadelphia, PA',
    focus: 'Neighborhood tasting room',
    outcome: 'Booked out the next six private dining inquiries within three days of launch.',
    pillars: ['Chef bio storytelling', 'Reservation clarity', 'Email capture sequences'],
  },
  {
    name: 'Onyx Dumpling Bar',
    location: 'Seattle, WA',
    focus: 'Late-night dumpling bar',
    outcome: 'Tripled direct order clicks by integrating ordering with moody, cinematic visuals.',
    pillars: ['Dark mode design system', 'Video hero integration', 'DoorDash + in-house ordering'],
  },
  {
    name: 'Mar Azul Cantina',
    location: 'San Antonio, TX',
    focus: 'Coastal Mexican cantina',
    outcome: 'Grew catering leads by 62% through bilingual landing sections and social proof.',
    pillars: ['Bilingual UX', 'Catering CTA flow', 'Seasonal cocktail highlights'],
  },
];

const capabilities = [
  'Brand positioning & naming workshops',
  'Conversion-focused copywriting and menu narrative',
  'Custom Next.js development with blazing-fast performance',
  'Integration with Resy, OpenTable, Toast, Tock, and BentoBox',
  'Photography and video art direction with trusted partners',
  'Ongoing optimisation, analytics reviews, and seasonal refreshes',
];

export default function Work() {
  return (
    <Layout title="Work" description="Selected Studio Abreu restaurant website launches and hospitality capabilities.">
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.heroEyebrow}>Selected engagements</p>
            <h1 className={styles.heroTitle}>Case studies crafted for restaurateurs who value nuance.</h1>
            <p>
              Studio Abreu partners with owners and culinary teams who see their website as a handshake. Every project is bespoke, efficient, and handled directly by Daniel Abreu.
            </p>
          </div>
        </section>

        <section className={styles.projectsSection}>
          <div className={styles.projectsGrid}>
            {projects.map(project => (
              <article key={project.name} className={styles.projectCard}>
                <header>
                  <p className={styles.projectEyebrow}>{project.location} · {project.focus}</p>
                  <h2>{project.name}</h2>
                </header>
                <p className={styles.projectOutcome}>{project.outcome}</p>
                <ul>
                  {project.pillars.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.capabilitiesSection}>
          <div className={styles.capabilitiesInner}>
            <div className={styles.capabilitiesCopy}>
              <p className={styles.sectionEyebrow}>Capabilities</p>
              <h2>What Studio Abreu brings to the table.</h2>
              <p>
                From naming a new concept to refining a legacy brand, you receive hands-on guidance every step of the way. We coordinate stakeholders, lead art direction, and translate your hospitality into a digital experience that feels lived-in.
              </p>
            </div>
            <ul className={styles.capabilitiesList}>
              {capabilities.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <h2>Ready for a site that owners and investors trust?</h2>
            <p>
              Share your concept, current deck, or even a menu draft. Daniel will respond within one business day with next steps and availability.
            </p>
            <Link href="/contact" className={styles.primaryCta}>
              Start the conversation
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
