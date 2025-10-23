import '../styles/globals.css';
import Script from 'next/script';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* Load scroll.js after DOM is ready */}
      <Script src="/scroll.js" strategy="afterInteractive" />
      <Component {...pageProps} />
    </>
  );
}
