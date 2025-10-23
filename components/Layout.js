import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? title + ' | Eric Finbarr Carey • Tenor' : 'Eric Finbarr Carey • Tenor'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  );
}
