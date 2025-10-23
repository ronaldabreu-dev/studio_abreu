import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function GalleryRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/media');
  }, [router]);

  return (
    <>
      <Head>
        <meta httpEquiv="refresh" content="0; url=/media" />
        <title>Redirecting to Media</title>
      </Head>
      <main className="redirect-page">
        <p>
          Redirecting to the <a href="/media">media page</a>...
        </p>
      </main>
    </>
  );
}
