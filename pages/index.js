import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';

const trustPillars = [
  {
    title: 'Direct trust in every introduction',
    body:
      'Your website reads like a confident, personal note. Studio Abreu builds each page so a cold email, DM, or referral instantly feels legitimate.',
  },
  {
    title: 'Simplicity restaurateurs respect',
    body:
      'Operators are busy. We prioritise clear navigation, obvious calls-to-action, and copy that sounds like a real human—so owners know exactly what happens next.',
  },
  {
    title: 'Authentic, personal credibility',
    body:
      'There is no handoff to a mystery team. You work directly with Daniel Abreu from first call to launch, with handcrafted details that feel bespoke.',
  },
];

const serviceInclusions = [
  'Launch-ready, single-scroll website crafted in two weeks',
  'Story-driven photography direction and menu positioning',
  'Integrated reservations, gift cards, and Google profile updates',
  '90-day refinement window with proactive conversion tweaks',
];

const processSteps = [
  {
    title: '1. Listening Session',
    description:
      'A 45-minute strategy call to understand your guests, signature dishes, and what makes trust hard right now. We set the communication cadence and align on voice.',
  },
  {
    title: '2. Brand Mise en Place',
    description:
      'Moodboards, copy outlines, and hero messaging crafted for cold outreach. You receive a concise brief that the whole ownership team can approve in under ten minutes.',
  },
  {
    title: '3. Build & Polish',
    description:
      'We design, develop, and integrate your tech stack—resy, Toast, BentoBox, or custom forms—then stress-test the site on mobile before you ever send a link.',
  },
];

const testimonials = [
  {
    quote:
      '“Studio Abreu made our small dining room feel like a destination. Owners call back because the site already answers the questions they care about.”',
    attribution: 'Lucia Pereira — Co-owner, Cora & Finch',
  },
  {
    quote:
      '“The copy sounds exactly like us. We booked three tastings the first week just from people replying to the website link in my DMs.”',
    attribution: 'Marcus Lin — Chef-Partner, Onyx Dumpling Bar',
  },
];

export default function Home() {
  return (
    <Layout>
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.heroEyebrow}>Boutique hospitality web studio</p>
            <h1 className={styles.heroTitle}>
              Restaurant websites that earn trust the moment you share the link.
            </h1>
            <p className={styles.heroSubtitle}>
              Studio Abreu is the solo practice of Daniel Abreu. We design and build
              sites for independent restaurants who need to look as thoughtful online
              as they are tableside.
            </p>
            <div className={styles.ctaGroup}>
              <Link href="/contact" className={styles.primaryCta}>
                Start a project
              </Link>
              <Link href="/work" className={styles.secondaryCta}>
                View recent launches
              </Link>
            </div>
            <div className={styles.heroBadge}>$1,500 launch · $75/mo hosting & care</div>
          </div>
        </section>

        <section className={styles.pillarsSection}>
          <header className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>Why restaurateurs choose Studio Abreu</p>
            <h2 className={styles.sectionTitle}>Built for direct trust, simple conversations, and personal credibility.</h2>
          </header>
          <div className={styles.pillarsGrid}>
            {trustPillars.map(pillar => (
              <article key={pillar.title} className={styles.pillarCard}>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.serviceSection}>
          <div className={styles.serviceContent}>
            <div className={styles.serviceIntro}>
              <p className={styles.sectionEyebrow}>The signature engagement</p>
              <h2 className={styles.sectionTitle}>Studio Abreu Launch</h2>
              <p>
                A productised website package designed to keep your outreach fast and
                focused. One price, clear deliverables, and an owner who sees and
                signs off on every page.
              </p>
            </div>
            <div className={styles.serviceDetails}>
              <div className={styles.priceTag}>
                <span className={styles.pricePrimary}>$1,500</span>
                <span className={styles.priceMeta}>launch fee</span>
                <span className={styles.priceSupport}>+$75/mo ongoing care</span>
              </div>
              <ul>
                {serviceInclusions.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.workPreview}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>Hospitality-forward storytelling</p>
            <h2 className={styles.sectionTitle}>Tasteful, cinematic layouts that feel like your dining room.</h2>
          </div>
          <div className={styles.workGrid}>
            <div className={styles.workCard}>
              <span className={styles.workLabel}>Cora & Finch</span>
              <p>Warm minimalism with menu spotlights and a concierge-style reservation flow.</p>
            </div>
            <div className={styles.workCard}>
              <span className={styles.workLabel}>Onyx Dumpling Bar</span>
              <p>Evening palette, looping steam footage, and direct-order integrations.</p>
            </div>
            <div className={styles.workCard}>
              <span className={styles.workLabel}>Mar Azul Cantina</span>
              <p>Vibrant hero storytelling, bilingual menu tabs, and catering inquiry funnels.</p>
            </div>
          </div>
          <Link href="/work" className={styles.inlineLink}>
            See the full Studio Abreu portfolio ↗
          </Link>
        </section>

        <section className={styles.processSection}>
          <header className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>Proven rhythm</p>
            <h2 className={styles.sectionTitle}>A boutique process designed for owners with limited time.</h2>
          </header>
          <div className={styles.processGrid}>
            {processSteps.map(step => (
              <article key={step.title} className={styles.processCard}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.testimonialSection}>
          <header className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>Specialists are remembered</p>
            <h2 className={styles.sectionTitle}>Owners call back when your website feels handcrafted.</h2>
          </header>
          <div className={styles.testimonialGrid}>
            {testimonials.map(testimonial => (
              <figure key={testimonial.attribution} className={styles.testimonialCard}>
                <blockquote>“{testimonial.quote.replace(/”$/, '')}”</blockquote>
                <figcaption>{testimonial.attribution}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className={styles.founderSection}>
          <div className={styles.founderContent}>
            <p className={styles.sectionEyebrow}>From the desk of Daniel Abreu</p>
            <h2 className={styles.sectionTitle}>Craftsmanship and reliability first, always.</h2>
            <p>
              Studio Abreu started inside a family restaurant in Newark. I watched my
              parents spend thousands on generic templates that never felt like us.
              Now I build every project personally—writing copy, designing layouts,
              and obsessing over the handoff so you never wonder who is answering the
              email.
            </p>
            <p>
              When you DM a prospective partner or reply to a catering request, your
              link should signal craftsmanship in seconds. That is the promise of
              Studio Abreu.
            </p>
            <Link href="/contact" className={styles.primaryCta}>
              Schedule a consultation
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
