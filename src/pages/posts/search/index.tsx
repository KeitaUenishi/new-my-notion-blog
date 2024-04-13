import React from "react";

import DocumentHead from "@/components/document-head";
import BlogContents from "@/components/layout/BlogContents";
import { Layout } from "@/components/layout/Layout";
import { getPostsBySearch } from "@/lib/notion/client";
import styles from "@/styles/blog.module.css";

export async function getServerSideProps({ query }) {
  const posts = await getPostsBySearch(query.q);

  return {
    props: {
      word: query.q || "",
      posts,
    },
  };
}

const RenderPostsForSearch = ({ word, posts = [] }) => {
  return (
    <Layout>
      <DocumentHead description={`Post search`} />
      <div className={styles.container}>
        <header>
          <h2>{word} の検索結果</h2>
        </header>

        <div className={styles.mainContent}>
          <BlogContents posts={posts} />
        </div>
      </div>
    </Layout>
  );
};

export default RenderPostsForSearch;
