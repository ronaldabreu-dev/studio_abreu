// components/CalendarEvents.jsx
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { getEventSlug } from '../lib/eventUtils';
import PastEventsCarousel from './PastEventsCarousel';

export default function CalendarEvents({ sectionClassName = '', title = 'Upcoming Events' }) {
  const [events, setEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [perPage, setPerPage] = useState(3);
  const [isMobile, setIsMobile] = useState(false);

  // Load events
  useEffect(() => {
    let isMounted = true;
    fetch('/events.json')
      .then(res => res.json())
      .then(data => {
        if (!isMounted) return;

        const today = new Date();
        const startOfToday = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
        );

        const rawEvents = Array.isArray(data) ? data : [];
        const parsedEvents = rawEvents.map(event => {
          const date = new Date(event.date);
          return {
            event,
            date,
            isValid: !isNaN(date),
          };
        });

        const invalidDateEvents = parsedEvents
          .filter(({ isValid }) => !isValid)
          .map(({ event }) => event);

        const validEvents = parsedEvents.filter(({ isValid }) => isValid);

        const upcomingEvents = validEvents
          .filter(({ date }) => date >= startOfToday)
          .sort((a, b) => a.date - b.date)
          .map(({ event }) => event);

        const sortedPastEvents = validEvents
          .filter(({ date }) => date < startOfToday)
          .sort((a, b) => b.date - a.date)
          .map(({ event }) => ({
            ...event,
            description: event.description || event.location || '',
          }));

        setEvents([...upcomingEvents, ...invalidDateEvents]);
        setPastEvents(sortedPastEvents);
        setIsLoading(false);
      })
      .catch(() => {
        if (isMounted) {
          setEvents([]);
          setPastEvents([]);
          setIsLoading(false);
        }
      });
    return () => { isMounted = false; };
  }, []);

  // Responsive: 1 per slide on mobile, 3 on desktop
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 700;
      setPerPage(mobile ? 1 : 3);
      setIsMobile(mobile);
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const highlights = useMemo(() => pastEvents.slice(0, 6), [pastEvents]);

  if (!events.length) {
    return (
      <section className={sectionClassName}>
        <h2>Past Event Highlights</h2>
        {isLoading ? (
          <p>Loading events…</p>
        ) : highlights.length ? (
          <PastEventsCarousel events={highlights} />
        ) : (
          <p>No past events to display.</p>
        )}
      </section>
    );
  }

  const totalSlides = Math.ceil(events.length / perPage);
  const clampedCurrent = Math.min(current, totalSlides - 1);
  const startIdx = clampedCurrent * perPage;
  const visibleEvents = events.slice(startIdx, startIdx + perPage);

  const goLeft = () => setCurrent(prev => Math.max(prev - 1, 0));
  const goRight = () => setCurrent(prev => Math.min(prev + 1, totalSlides - 1));

  const containerPadding = isMobile ? '0 1rem 4.5rem' : '0 2rem 4rem';

  // Shared arrow styles
  const circleBtn = (size, fontSize) => ({
    background: '#7a2323',
    color: '#fff',
    border: '2px solid #f3e7b4',
    borderRadius: 999,
    width: size,
    height: size,
    fontSize,
    fontWeight: 700,
    boxShadow: '0 4px 14px rgba(34,34,34,0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',
  });

  return (
    <section className={sectionClassName}>
      <h2>{title}</h2>
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 1200,
          margin: '0 auto',
          padding: containerPadding,
        }}
      >
      {/* MOBILE: centered control group at bottom */}
      {isMobile && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            bottom: 16,
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 32,
            zIndex: 10,
          }}
        >
          <button
            onClick={goLeft}
            aria-label="Previous"
            disabled={clampedCurrent === 0}
            style={{
              ...circleBtn(44, 22),
              opacity: clampedCurrent === 0 ? 0.45 : 1,
              pointerEvents: clampedCurrent === 0 ? 'none' : 'auto',
            }}
          >
            &#8592;
          </button>
          <button
            onClick={goRight}
            aria-label="Next"
            disabled={clampedCurrent === totalSlides - 1}
            style={{
              ...circleBtn(44, 22),
              opacity: clampedCurrent === totalSlides - 1 ? 0.45 : 1,
              pointerEvents: clampedCurrent === totalSlides - 1 ? 'none' : 'auto',
            }}
          >
            &#8594;
          </button>
        </div>
      )}

      {/* DESKTOP: edge arrows */}
      {!isMobile && clampedCurrent > 0 && (
        <button
          onClick={goLeft}
          aria-label="Previous"
          style={{
            position: 'absolute',
            top: '50%',
            left: -3,
            transform: 'translateY(-50%)',
            zIndex: 5,
            ...circleBtn(48, 24),
          }}
        >
          &#8592;
        </button>
      )}
      {!isMobile && clampedCurrent < totalSlides - 1 && (
        <button
          onClick={goRight}
          aria-label="Next"
          style={{
            position: 'absolute',
            top: '50%',
            right: -3,
            transform: 'translateY(-50%)',
            zIndex: 5,
            ...circleBtn(48, 24),
          }}
        >
          &#8594;
        </button>
      )}

        {/* Cards Row */}
        <div
          style={{
            display: 'flex',
            flexWrap: isMobile ? 'wrap' : 'nowrap',
            gap: isMobile ? '1.5rem' : '2rem',
            justifyContent: 'center',
            alignItems: 'stretch',
            minHeight: 220,
            width: '100%',
            margin: '0 auto',
          }}
        >
        {visibleEvents.map((event, idx) => {
          const key = `${getEventSlug(event)}-${startIdx + idx}`;
          return (
            <Link
              href={`/calendar/${getEventSlug(event)}`}
              key={key}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                flex: isMobile ? '1 1 100%' : '0 1 320px',
                maxWidth: isMobile ? '100%' : 320,
                minWidth: isMobile ? 'auto' : 220,
                display: 'flex',
              }}
            >
              <div
                style={{
                  background: '#f8f8f8',
                  borderRadius: 10,
                  boxShadow: '0 2px 8px rgba(34,34,34,0.08)',
                  padding: isMobile ? '1.25rem 1.5rem' : '1.5rem 2rem',
                  width: '100%',
                  height: '100%',
                  transition: 'box-shadow 0.2s',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                }}
              >
                <div
                  style={{
                    height: isMobile ? 180 : 150,
                    overflow: 'hidden',
                    borderRadius: 6,
                    marginBottom: '1rem',
                  }}
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 8 }}>
                  {event.title}
                </div>
                <div style={{ color: '#7a2323', fontWeight: 500, marginBottom: 4 }}>
                  {event.date}
                </div>
                <div style={{ color: '#555', fontSize: '0.98rem' }}>
                  {event.location}
                </div>
              </div>
            </Link>
          );
        })}
        </div>

        {/* Slide Indicators */}
        <div style={{ textAlign: 'center', marginTop: isMobile ? 24 : 16 }}>
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <span
              key={idx}
              aria-hidden="true"
              style={{
                display: 'inline-block',
                width: idx === clampedCurrent ? 12 : 10,
                height: idx === clampedCurrent ? 12 : 10,
                borderRadius: '50%',
                background: idx === clampedCurrent ? '#7a2323' : '#ccc',
                margin: '0 4px',
                transition: 'all 0.2s ease',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
