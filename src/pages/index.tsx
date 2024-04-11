import Link from "next/link";

import DocumentHead from "@/components/document-head";
import BlogContents from "@/components/layout/BlogContents";
import { getRankedPosts } from "@/lib/notion/client";
import styles from "@/styles/page.module.css";

export async function getStaticProps() {
  const posts = await getRankedPosts();

  return {
    props: {
      posts,
    },
    revalidate: 60,
  };
}

const RenderPage = ({ posts = [] }) => {
  return (
    <>
      <DocumentHead />
      <section className={styles.container}>
        <section className={styles.profileContainer}>
          <div>
            <img className={styles.profileImage} src="/images/profile.jpg" width={80} height={80} alt="profile" />
          </div>
          <div>
            <p>1992年9月5日生まれ。 27歳までバンドでギターを弾いていました。</p>
            <p>職歴なしの状態から28歳でエンジニアとして就職。</p>
            <p>React,TypeScript, Next.jsをメインに使用しWebアプリを開発しています。大阪在住。</p>
          </div>
        </section>
        <section className={styles.contentsContainer}>
          <BlogContents posts={posts} />
        </section>
        <footer>
          <div className={styles.postPageLink}>
            <Link href="/posts" passHref>
              ブログ一覧へ
            </Link>
          </div>
        </footer>
      </section>
    </>
  );
};

export default RenderPage;
