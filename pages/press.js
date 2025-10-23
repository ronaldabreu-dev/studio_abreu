
import Layout from "../components/Layout";
import pressQuotes from "../data/press";
import styles from "../styles/Press.module.css";

const bannerColors = ["#f3e7b4", "#e5e0d3", "#d8d2c4"];

export default function Press() {
  return (
    <Layout title="Press">
      <main className={styles.main}>
        <section
          className={`${styles.hero} parallaxBackground`}
          data-parallax-zoom="1"
          data-parallax-fit="width"
          data-parallax-focus-y="60"
          data-parallax-offset="30"
          data-parallax-speed="0.4"
          data-parallax-mobile-fit="width"   
          data-parallax-mobile-focus-y="71"
          data-parallax-mobile-speed="0.12"
          data-parallax-mobile-offset="0"
          data-parallax-mobile-img-zoom="1.8"

        >
          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>Critical Acclaim</p>
            <h1 className={styles.heroTitle}>Press</h1>
            <p className={styles.heroSubtitle}>
              Reviews and features spotlighting the artistry of Eric Finbarr
              Carey on opera and concert stages worldwide.
            </p>
          </div>
        </section>

        <section className={styles.quotes}>
          {pressQuotes.map((item, idx) => (
            <article
              key={idx}
              className={`fade-in ${styles.quote}`}
              style={{
                backgroundColor: bannerColors[idx % bannerColors.length],
              }}
            >
              <h3>“{item.quote}”</h3>
              <p className={styles.source}>
                — {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.source}
                  </a>
                ) : (
                  item.source
                )}
              </p>
            </article>
          ))}
        </section>
      </main>
    </Layout>
  );
}
