import Layout from '../components/Layout';
import styles from '../styles/About.module.css';

export default function About() {
  return (
    <Layout title="About">
      <main className={styles.main}>
        <section
          className={`${styles.hero} parallaxBackground`}
          data-parallax-zoom="1"
          data-parallax-fit="width"
          data-parallax-focus-y="-290"
          data-parallax-offset="350"
          data-parallax-speed="0.00"
          data-parallax-mobile-fit="width"   
          data-parallax-mobile-focus-y="69"
          data-parallax-mobile-speed="0.17"
          data-parallax-mobile-offset="25"
          data-parallax-mobile-img-zoom="1.7"
        >
          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>Eric Finbarr Carey</p>
            <h1 className={styles.heroTitle}>About</h1>
            <p className={styles.heroSubtitle}>
              Luminous lyric tenor celebrated for radiant color and an agile,
              story-driven artistry across opera and concert stages.
            </p>
          </div>
        </section>

        <section className={`${styles.bioSection} fade-in`}>
          <p>
            Praised for his “silken tenor” (Opera News), Eric Finbarr Carey
            enters the 2025/2026 fall season with a slate of debuts and return
            engagements. He makes his French debut in a new production of
            Händel’s <em>Der Messias</em> with Opéra de Limoges, sings Testo in
            Monteverdi’s <em>Il Combattimento di Tancredi e Clorinda</em> with
            Catapult Opera, and appears as soloist in Britten’s <em>Les
            Illuminations</em> with the Handel Society of Dartmouth. He also
            returns for performances of <em>Messiah</em> with Upper Valley
            Baroque, the Baltimore Händel Choir, and Philadelphia Choral Arts
            and Connecticut Early Music Festival, and gives recitals with
            pianist Erika Switzer. Carey was awarded first prize in the 2025
            Clermont-Auvergne Opéra Competition. This past summer, he joined the
            Marlboro Music Festival as tenor in residence, where he appeared in
            recital with Jonathan Biss and Lydia Brown.
          </p>
        </section>

        <section
          className={`${styles.parallaxOne} parallaxBackground`}
          data-parallax-zoom="1"
          data-parallax-fit="width"
          data-parallax-focus-y="30"
          data-parallax-offset="10"
          data-parallax-mobile-fit="width"   
          data-parallax-mobile-focus-y="35"
          data-parallax-mobile-speed="0.13"
          data-parallax-mobile-offset="10"
          data-parallax-mobile-img-zoom="1.4"
        ></section>

        <section className={`${styles.bioSection} fade-in`}>
          <p>
            Recent highlights include a celebrated run as <em>Albert Herring </em>
             with Opera Baltimore, his Carnegie Hall debut in Mozart’s
            <em> Requiem</em> and Bach’s <em>Magnificat</em> with the Oratorio
            Society of New York, and performances with the Gewandhausorchester
            in Stravinsky’s <em>Pulcinella</em>. He has also returned to the
            Boston Symphony Orchestra for Doug Balliet’s <em>Beast Fights </em>
            and Britten’s <em>Canticle V</em>, Evangelist in Bach’s
            <em> St. John Passion</em> with Princeton Pro Musica and Bach in
            Baltimore, and appeared as soloist in Handel’s <em>Dixit
            Dominus</em>, Monteverdi’s <em>Vespers of 1610</em> with Upper Valley
            Baroque, and a program of <em>Air de Cour </em> with lutenist Richard
            Stone of Tempesta di Mare.
          </p>
          <p>
            Carey has been in residence at the Renée Fleming Song Studio at
            Carnegie Hall, the Britten-Pears Festival, and the Tanglewood Music
            Center. His awards include second place in both the Oratorio Society
            of New York and Gerda Lissner Song Competitions, an Encouragement
            Award in the Metropolitan Opera Competition, and recognition as a
            Grand Finalist in the Joy in Singing Competition. He is also a
            first-prize winner of the Sparks and Wiry Cries Art Song Competition
            and the Bard Conservatory Concerto Competition.
          </p>
        </section>

        <section
          className={`${styles.parallaxTwo} parallaxBackground`}
          data-parallax-zoom="1"
          data-parallax-fit="width"
          data-parallax-speed="0.2"
          data-parallax-focus-y="-95"
          data-parallax-offset="-10"
          data-parallax-mobile-fit="width"   
          data-parallax-mobile-focus-y="35"
          data-parallax-mobile-speed="0.13"
          data-parallax-mobile-offset="10"
          data-parallax-mobile-img-zoom="1"
        ></section>

        <section className={`${styles.bioSection} fade-in`}>
          <p>
            Carey is an alumnus of Bard College, Boston University, Peabody
            Conservatory, and The Johns Hopkins University. He is represented by
            TACT Artists Management.
          </p>
        </section>
      </main>
    </Layout>
  );
}
