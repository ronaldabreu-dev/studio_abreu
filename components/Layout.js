import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

const BASE_TITLE = 'Studio Abreu • Restaurant Websites that Earn Trust';
const BASE_DESCRIPTION =
  'Studio Abreu builds handcrafted websites for independent restaurants and hospitality teams who need instant credibility and clear communication.';

export default function Layout({ title, description, children }) {
  const pageTitle = title ? `${title} | ${BASE_TITLE}` : BASE_TITLE;
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description || BASE_DESCRIPTION} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description || BASE_DESCRIPTION} />
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  );
}
