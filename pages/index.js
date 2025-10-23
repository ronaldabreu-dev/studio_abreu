import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';
import CalendarEvents from '../components/CalendarEvents';

export default function Home() {
  return (
    <Layout>
      <main className={styles.main}>
        {/* Hero Section */}
        {/* HERO with parallax */}
        <section
          className={`${styles.hero} parallaxBackground`}
          data-parallax-speed="0.35"            // desktop scroll factor
          data-parallax-offset="30"
          data-parallax-fit="width"             // 'cover' | 'width' | 'height' | 'contain'
          data-parallax-focus-y="50"            // 0=top, 50=center, 100=bottom

          /* Mobile overrides */
          data-parallax-mobile-fit="height"   
          data-parallax-mobile-focus-y="60"
          data-parallax-mobile-speed="0.17"
          data-parallax-mobile-offset="0"
          data-parallax-mobile-img-zoom=".5" // see a bit more of the image on mobile
        >
          <div className={styles.heroText}>
            <h1>ERIC FINBARR CAREY</h1>
            <span className={styles.tenor}>Tenor</span>
          </div>
        </section>


        {/* Quote & Collage Section */}
        <section className={`fade-in ${styles.quoteSection} ${styles.compactQuote}`}>
          <div className={styles.quoteCollageBlock}>
            <blockquote className={styles.bigQuote}>
              “An exceptional soloist…who was particularly expressive and found a
              great deal of dynamic range.”
            </blockquote>
            <div className={styles.bioRow}>
              <div className={styles.bioCopy}>
                <p className={styles.bio}>
                  Praised for his “silken tenor” (Opera News), Eric Finbarr Carey
                  opens the 2025/26 season with debuts at Opéra de Limoges,
                  Catapult Opera, Dartmouth, and Jazz at Lincoln Center. He also
                  appears in Messiah across the U.S., gives recitals with Erika
                  Switzer, and recently won first prize in the 2025 Clermont-Auvergne
                  Opéra Competition. This summer, he performed at the Marlboro Music
                  Festival with Jonathan Biss and Lydia Brown.
                </p>
              </div>
              <div className={styles.quotePortrait} data-portrait-size="lg">
                <img src="/images/portrait1.jpg" alt="Portrait" className={styles.portraitImg} />
              </div>

            </div>
          </div>
        </section>

        {/* Feature Image Section */}
        <section
          className={`fade-in ${styles.featureSection} parallaxBackground`}
          data-parallax-zoom="1"
          data-parallax-fit="width" 
          data-parallax-speed="0.8"
          data-parallax-focus-y="55"
          data-parallax-offset="10"

          data-parallax-mobile-fit="width"   
          data-parallax-mobile-focus-y="45"
          data-parallax-mobile-speed="0.1"
          data-parallax-mobile-offset="30"
          data-parallax-mobile-img-zoom="1.3"
        >
          <div className={styles.featureQuoteOverlay}>
            <blockquote className={styles.featureQuote}>
              “Tenor Eric Finbarr Carey, in the role of ever-optimistic Candide,
              was resonant, mellifluous, and deft with dramatic nuance.”
            </blockquote>
            <span className={styles.featureAttribution}>
              — <span className={styles.featureAttributionHighlight}>Millbrook
              Independent</span>
            </span>
          </div>
        </section>

        {/* Additional Highlight Section */}
        <section
          className={`fade-in ${styles.highlightSection} parallaxBackground`}
          data-parallax-zoom="1"
          data-parallax-fit="width"
          data-parallax-speed="0.6"
          data-parallax-offset="-30"
          data-parallax-focus-y="65"
          data-parallax-mobile-fit="width"   
          data-parallax-mobile-focus-y="50"
          data-parallax-mobile-speed="0.15"
          data-parallax-mobile-offset="0"
          data-parallax-mobile-img-zoom="1.5"
        >
          <div className={styles.highlightOverlay}>
            <blockquote className={styles.highlightQuote}>
              “Noted for his ‘silken tenor.’”
            </blockquote>
            <span className={styles.highlightAttribution}>— Opera News</span>
          </div>
        </section>

        {/* Calendar Events Section */}
        <CalendarEvents
          sectionClassName={styles.calendarSection}
          title="Upcoming Events"
        />

        {/* Banner Image Section */}
        <section
          className={`fade-in ${styles.bannerSection} parallaxBackground`}
          data-parallax-zoom="1"
          data-parallax-fit="width"
          data-parallax-offset="-20"
          data-parallax-focus-y="65"
          data-parallax-mobile-fit="width"   
          data-parallax-mobile-focus-y="45"
          data-parallax-mobile-speed="0.1"
          data-parallax-mobile-offset="20"
          data-parallax-mobile-img-zoom="1.1"
        ></section>

      </main>
    </Layout>
  );
}
