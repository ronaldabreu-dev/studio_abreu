import Layout from '../components/Layout';
import styles from '../styles/About.module.css';

const principles = [
  {
    title: 'Hospitality-first strategy',
    description:
      'We translate your dining room rituals into digital touchpoints. Every headline, menu description, and CTA mirrors how you welcome guests in person.',
  },
  {
    title: 'Founder-led craftsmanship',
    description:
      'Daniel Abreu designs, writes, and develops each site himself. There is no junior team to brief or outsource—your project stays in one set of hands.',
  },
  {
    title: 'Sustainable momentum',
    description:
      'Launch is only the beginning. We monitor reservations, gifting, and private event conversions, then ship monthly refinements so the site keeps working hard.',
  },
];

const promises = [
  'One point of contact from kickoff to launch.',
  'Transparent timelines with two-week sprints and weekly Loom updates.',
  'Pre-launch QA across mobile, tablet, and desktop using real guest scenarios.',
  'Training for your team with short, searchable documentation.',
];

export default function About() {
  return (
    <Layout title="Approach" description="Studio Abreu\'s approach to crafting trustworthy restaurant websites.">
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.heroEyebrow}>Studio Abreu approach</p>
            <h1>Hospitality, codified and shipped in weeks—not months.</h1>
            <p>
              You are inviting Studio Abreu into the heartbeat of your restaurant. The work respects that: thoughtful listening, intentional strategy, and details that make investors, press, and partners feel the craft in seconds.
            </p>
          </div>
        </section>

        <section className={styles.principlesSection}>
          <div className={styles.principlesGrid}>
            {principles.map(principle => (
              <article key={principle.title} className={styles.principleCard}>
                <h2>{principle.title}</h2>
                <p>{principle.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.promiseSection}>
          <div className={styles.promiseCard}>
            <p className={styles.sectionEyebrow}>What to expect</p>
            <h2>A boutique engagement that protects your time.</h2>
            <ul>
              {promises.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </Layout>
  );
}
