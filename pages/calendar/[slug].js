import Link from 'next/link';
import Layout from '../../components/Layout';
import upcomingEvents from '../../public/events.json';
import pastEvents from '../../public/past-events.json';
import styles from '../../styles/EventPage.module.css';
import { getEventSlug, formatEventDate } from '../../lib/eventUtils';

export default function EventPage({ event, prev, next }) {
  return (
    <Layout title={event.title}>
      <main className={styles.main}>
        <div className={styles.imageWrapper}>
          <img src={event.image} alt={event.title} className={styles.eventImage} />
        </div>
        <section className={styles.details}>
          <h1>{event.title}</h1>
          <p className={styles.date}>{formatEventDate(event.date)}</p>
          <p className={styles.location}>{event.location}</p>
          {event.description && (
            <p className={styles.description}>{event.description}</p>
          )}
          {event.link && (
            <a
              href={event.link}
              className={styles.learnMore}
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More
            </a>
          )}
        </section>
        <div className={styles.navWrapper}>
          {prev && (
            <Link href={`/calendar/${getEventSlug(prev)}`} className={styles.navItem}>
              <div className={styles.navLabel}>
                <span className={styles.navDate}>{formatEventDate(prev.date)}</span>
                <span className={styles.navTitle}>{prev.title}</span>
              </div>
              <span className={styles.navArrow}>&larr;</span>
            </Link>
          )}
          {next && (
            <Link href={`/calendar/${getEventSlug(next)}`} className={styles.navItem}>
              <div className={styles.navLabel}>
                <span className={styles.navDate}>{formatEventDate(next.date)}</span>
                <span className={styles.navTitle}>{next.title}</span>
              </div>
              <span className={styles.navArrow}>&rarr;</span>
            </Link>
          )}
        </div>
      </main>
    </Layout>
  );
}

export async function getStaticPaths() {
  const upcomingPaths = upcomingEvents.map((ev) => ({
    params: { slug: getEventSlug(ev) },
  }));
  const pastPaths = pastEvents.map((ev) => ({
    params: { slug: getEventSlug(ev) },
  }));
  return { paths: [...upcomingPaths, ...pastPaths], fallback: false };
}

export async function getStaticProps({ params }) {
  const isUpcoming = upcomingEvents.some((ev) => getEventSlug(ev) === params.slug);
  const dataset = isUpcoming ? upcomingEvents : pastEvents;
  const sorted = [...dataset].sort((a, b) => new Date(a.date) - new Date(b.date));
  const index = sorted.findIndex((ev) => getEventSlug(ev) === params.slug);
  const event = sorted[index];
  const prev = index > 0 ? sorted[index - 1] : null;
  const next = index < sorted.length - 1 ? sorted[index + 1] : null;
  return {
    props: {
      event,
      prev,
      next,
    },
  };
}
