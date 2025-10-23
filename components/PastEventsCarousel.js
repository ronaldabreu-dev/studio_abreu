import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getEventSlug } from '../lib/eventUtils';

export default function PastEventsCarousel({ events: providedEvents }) {
  const [events, setEvents] = useState(providedEvents ?? []);
  const [current, setCurrent] = useState(0);
  const [perPage, setPerPage] = useState(3);

  const shouldFetch = useMemo(() => !providedEvents, [providedEvents]);

  useEffect(() => {
    if (!shouldFetch) {
      setEvents(providedEvents ?? []);
      return;
    }

    fetch('/past-events.json')
      .then(res => res.json())
      .then(setEvents)
      .catch(() => setEvents([]));
  }, [providedEvents, shouldFetch]);

  useEffect(() => {
    const handleResize = () => {
      setPerPage(window.innerWidth < 700 ? 1 : 3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!events.length) {
    return <p>No past events to display.</p>;
  }

  const totalSlides = Math.ceil(events.length / perPage);
  const startIdx = current * perPage;
  const visibleEvents = events.slice(startIdx, startIdx + perPage);

  const goLeft = () => setCurrent(prev => Math.max(prev - 1, 0));
  const goRight = () => setCurrent(prev => Math.min(prev + 1, totalSlides - 1));

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 1200, margin: '0 auto' }}>
      {current > 0 && (
        <button
          onClick={goLeft}
          aria-label="Previous"
          style={{
            position: 'absolute',
            left: -40,
            top: '50%',
            transform: 'translateY(-50%)',
            background: '#fff',
            border: 'none',
            borderRadius: '50%',
            boxShadow: '0 2px 8px rgba(34,34,34,0.12)',
            width: 40,
            height: 40,
            fontSize: 24,
            cursor: 'pointer',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'box-shadow 0.2s, background 0.2s',
          }}
          onMouseOver={e => e.currentTarget.style.background = '#f3e7b4'}
          onMouseOut={e => e.currentTarget.style.background = '#fff'}
        >
          &#8592;
        </button>
      )}
      {current < totalSlides - 1 && (
        <button
          onClick={goRight}
          aria-label="Next"
          style={{
            position: 'absolute',
            right: -40,
            top: '50%',
            transform: 'translateY(-50%)',
            background: '#fff',
            border: 'none',
            borderRadius: '50%',
            boxShadow: '0 2px 8px rgba(34,34,34,0.12)',
            width: 40,
            height: 40,
            fontSize: 24,
            cursor: 'pointer',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'box-shadow 0.2s, background 0.2s',
          }}
          onMouseOver={e => e.currentTarget.style.background = '#f3e7b4'}
          onMouseOut={e => e.currentTarget.style.background = '#fff'}
        >
          &#8594;
        </button>
      )}

      <div style={{
        display: 'flex',
        flexWrap: 'nowrap',
        gap: '2rem',
        justifyContent: 'center',
        alignItems: 'stretch',
        width: '100%',
        margin: '0 auto',
      }}>
        {visibleEvents.map((event, idx) => {
          const summary = event.description || event.location || '';
          const dateLabel = event.date && typeof event.date === 'string' ? event.date : '';
          const locationLabel =
            event.location && event.location !== summary ? event.location : '';

          return (
            <div
              key={startIdx + idx}
              style={{
                background: '#f8f8f8',
                borderRadius: 8,
                boxShadow: '0 2px 8px rgba(34,34,34,0.08)',
                overflow: 'hidden',
                maxWidth: 320,
                minWidth: 220,
                flex: '0 1 320px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                />
              </div>
              <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{ margin: '0 0 0.5rem' }}>{event.title}</h3>
                {dateLabel && (
                  <p style={{ margin: '0 0 0.5rem', color: '#7a2323', fontWeight: 600 }}>
                    {dateLabel}
                  </p>
                )}
                {summary && (
                  <p style={{ margin: '0 0 0.75rem', color: '#555', fontSize: '0.95rem' }}>
                    {summary}
                  </p>
                )}
                {locationLabel && (
                  <p style={{ margin: '0 0 1rem', color: '#777', fontSize: '0.9rem' }}>
                    {locationLabel}
                  </p>
                )}
                <Link
                  href={`/calendar/${getEventSlug(event)}`}
                  style={{
                    marginTop: 'auto',
                    alignSelf: 'flex-start',
                    padding: '0.5rem 1rem',
                    background: '#f3e7b4',
                    color: '#222',
                    textDecoration: 'none',
                    borderRadius: 4,
                    fontWeight: 'bold',
                  }}
                >
                  View Event
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: 'center', marginTop: 16 }}>
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <span key={idx} style={{
            display: 'inline-block',
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: idx === current ? '#7a2323' : '#ccc',
            margin: '0 4px',
          }} />
        ))}
      </div>
    </div>
  );
}
