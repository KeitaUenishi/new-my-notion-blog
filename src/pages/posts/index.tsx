import DocumentHead from "@/components/document-head";
import BlogContents from "@/components/layout/BlogContents";
import { Layout } from "@/components/layout/Layout";
import { NextPageLink, NoContents } from "@/components/ui/blog/blog-parts";
import { getPosts, getFirstPost, getRankedPosts, getAllPosts } from "@/lib/notion/client";
import styles from "@/styles/page.module.css";

export async function getStaticProps() {
  const [posts, allPosts, firstPost, rankedPosts] = await Promise.all([
    getPosts(),
    getAllPosts(),
    getFirstPost(),
    getRankedPosts(),
  ]);

  return {
    props: {
      posts,
      allPosts,
      firstPost,
      rankedPosts,
    },
    revalidate: 60,
  };
}

const RenderPosts = ({ posts = [], firstPost }) => {
  return (
    <Layout>
      <DocumentHead title="Blog" />
      <div className={styles.container}>
        {/** TODO: 共通化する */}
        <div className={styles.mainContent}>
          <NoContents contents={posts} />

          <BlogContents posts={posts} />
        </div>
        <footer>
          <NextPageLink firstPost={firstPost} posts={posts} />
        </footer>
      </div>
    </Layout>
  );
};

export default RenderPosts;
