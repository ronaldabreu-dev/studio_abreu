
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import PastEventsCarousel from '../../components/PastEventsCarousel';
import styles from '../../styles/Calendar.module.css';
import { getEventSlug } from '../../lib/eventUtils';

export default function Calendar() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    fetch('/events.json')
      .then((res) => res.json())
      .then((data) => {
        const today = new Date();
        const startOfToday = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
        );

        const sorted = [...data].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        const nextUpcoming = [];
        const nextPast = [];

        sorted.forEach((event) => {
          const eventDate = new Date(event.date);
          if (isNaN(eventDate)) {
            nextUpcoming.push(event);
            return;
          }

          if (eventDate < startOfToday) {
            nextPast.push(event);
          } else {
            nextUpcoming.push(event);
          }
        });

        setUpcomingEvents(nextUpcoming);
        setPastEvents(
          nextPast
            .reverse()
            .map((event) => ({
              ...event,
              description: event.description || event.location || '',
            }))
        );
      });
  }, []);


  return (
    <Layout title="Calendar">
      <main className={styles.main}>
        <section
          className={`${styles.hero} parallaxBackground`}
          data-parallax-zoom="1"
          data-parallax-fit="width"
          data-parallax-focus-y="80"
          data-parallax-offset="-60"
          data-parallax-mobile-fit="width"   
          data-parallax-mobile-focus-y="50"
          data-parallax-mobile-speed="0.17"
          data-parallax-mobile-offset="0"
          data-parallax-mobile-img-zoom="2"
        >
          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>Engagements</p>
            <h1 className={styles.heroTitle}>Calendar</h1>
            <p className={styles.heroSubtitle}>
              Discover upcoming performances, festival appearances, and recent
              highlights from Eric Finbarr Carey.
            </p>
          </div>
        </section>

        <section className={`fade-in ${styles.eventsSection}`}>
          <h2>Upcoming Events</h2>
          {upcomingEvents.length ? (
            <div className={styles.eventsGrid}>
              {upcomingEvents.map((event, idx) => {
                const dateObj = new Date(event.date);
                const isValidDate = !isNaN(dateObj);
                const day = isValidDate
                  ? String(dateObj.getDate()).padStart(2, '0')
                  : '--';
                const month = isValidDate
                  ? dateObj
                      .toLocaleString('default', { month: 'short' })
                      .toUpperCase()
                  : '--';
                return (
                  <div
                    className={styles.eventCard}
                    key={`${getEventSlug(event)}-${idx}`}
                    style={{
                      backgroundImage: `url(${event.image || '/placeholder.jpg'})`,
                    }}
                  >
                    <div className={styles.dateBox}>
                      <span className={styles.day}>{day}</span>
                      <span className={styles.month}>{month}</span>
                    </div>
                    <div className={styles.eventInfo}>
                      <h3>{event.title}</h3>
                      <p>{event.location}</p>
                      <Link
                        href={`/calendar/${getEventSlug(event)}`}
                        className={styles.eventButton}
                      >
                        View Event
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className={styles.emptyState}>
              No upcoming events at this time. Please check back soon.
            </p>
          )}
        </section>

        {pastEvents.length > 0 && (
          <section className={`fade-in ${styles.pastEventsSection}`}>
            <div className={styles.pastBanner}>Past Events Highlights</div>
            <PastEventsCarousel events={pastEvents} />
          </section>
        )}
      </main>
    </Layout>
  );
};
