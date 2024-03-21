import Link from "next/link";

import DocumentHead from "@/components/document-head";
import { NoContents } from "@/components/ui/blog/blog-parts";
import { BlogCard } from "@/components/ui/blog/blogCard";
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
    <div className={styles.container}>
      <DocumentHead />
      <div className={styles.blogContainer}>
        <div className={styles.profileContainer}>
          <div>
            <img className={styles.profileImage} src="/images/profile.jpg" width={80} height={80} alt="profile" />
          </div>
          <div>
            <p>1992年9月5日生まれ。 27歳までバンドでギターを弾いていました。</p>
            <p>職歴なしの状態から28歳でエンジニアとして就職。</p>
            <p>React,TypeScript, Next.jsをメインに使用しWebアプリを開発しています。大阪在住。</p>
          </div>
        </div>
        <div className={styles.mainContent}>
          <NoContents contents={posts} />

          {posts.map((post) => {
            return <BlogCard key={post.Slug} post={post} />;
          })}
        </div>
        <footer>
          <div className={styles.postPageLink}>
            <Link href="/posts" passHref>
              ブログ一覧へ
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default RenderPage;
