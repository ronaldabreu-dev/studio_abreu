import Layout from '../components/Layout';
import Link from 'next/link';
import styles from '../styles/Pricing.module.css';

const tiers = [
  {
    name: 'Launch',
    price: '$1,500',
    description: 'Perfect for independent restaurants preparing for opening or a major refresh.',
    details: [
      'Strategy session and positioning brief',
      'Single-scroll responsive website with three narrative sections',
      'Menu design, copywriting, and basic photography direction',
      'Reservation, ordering, and gift card integrations',
      '90-day optimisation window with analytics review',
    ],
  },
  {
    name: 'Seasonal Retainer',
    price: '$450/mo',
    description: 'For teams who want ongoing menu updates, landing pages, and marketing support.',
    details: [
      'Two design/development cycles per month',
      'Quarterly strategy call with campaign planning',
      'Pop-up, chef dinner, and PR landing pages',
      'Priority support for updates and menu uploads',
      'Optional add-ons: photo/video production, paid media coordination',
    ],
  },
];

export default function Pricing() {
  return (
    <Layout title="Pricing" description="Studio Abreu pricing for restaurant websites and ongoing support.">
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.heroEyebrow}>Pricing & commitments</p>
            <h1>Honest pricing that respects independent restaurateurs.</h1>
            <p>
              Clear packages, transparent timelines, and a specialist who manages every deliverable. Choose a launch or retain Studio Abreu for seasonal support.
            </p>
          </div>
        </section>

        <section className={styles.tierSection}>
          <div className={styles.tierGrid}>
            {tiers.map(tier => (
              <article key={tier.name} className={styles.tierCard}>
                <p className={styles.tierEyebrow}>Studio Abreu</p>
                <h2>{tier.name}</h2>
                <span className={styles.price}>{tier.price}</span>
                <p className={styles.tierDescription}>{tier.description}</p>
                <ul>
                  {tier.details.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.noteSection}>
          <div className={styles.noteCard}>
            <h2>Need a custom engagement?</h2>
            <p>
              Multi-unit groups, hotel F&B teams, and hospitality collectives often require expanded functionality. Share your deck or requirements and Daniel will prepare a tailored scope.
            </p>
            <Link href="/contact" className={styles.primaryCta}>
              Talk with Daniel
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
