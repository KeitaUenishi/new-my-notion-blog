import Head from "next/head";
import { useRouter } from "next/router";

import { NEXT_PUBLIC_URL } from "../lib/notion/server-constants";

export const SITE_TITLE = "uenishi.web";
export const SITE_DESCRIPTION = "Uenishi Keitaのポートフォリオサイトです。";
export const ogImage = `${NEXT_PUBLIC_URL}/images/blog-og-image.jpg`;

const DocumentHead = ({ title = "", description = "" }) => {
  const { asPath } = useRouter();

  return (
    <Head>
      <title>{title ? `${title} - ${SITE_TITLE}` : SITE_TITLE}</title>
      <meta name="description" content={description ? description : SITE_DESCRIPTION} />
      {NEXT_PUBLIC_URL ? <meta property="og:url" content={new URL(asPath, NEXT_PUBLIC_URL).toString()} /> : null}
      <meta property="og:title" content={title ? title : SITE_TITLE} />
      <meta property="og:description" content={description ? description : SITE_DESCRIPTION} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:title" content={title ? title : SITE_TITLE} />
      <meta name="twitter:description" content={description ? description : SITE_DESCRIPTION} />
      <meta name="twitter:creator" content="@uk092908" />
      {NEXT_PUBLIC_URL ? <link rel="canonical" href={new URL(asPath, NEXT_PUBLIC_URL).toString()} /> : null}
    </Head>
  );
};

export default DocumentHead;
