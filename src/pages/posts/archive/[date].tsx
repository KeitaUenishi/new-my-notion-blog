import { useRouter } from "next/router";
import React, { useEffect } from "react";

import DocumentHead from "@/components/document-head";
import BlogContents from "@/components/layout/BlogContents";
import { Layout } from "@/components/layout/Layout";
import { NoContents, PostsNotFound } from "@/components/ui/blog/blog-parts";
import { getPostsDate } from "@/lib/notion/client";
import styles from "@/styles/blog.module.css";

export async function getServerSideProps({ params: { date } }) {
  let posts = [];
  if (!date || !Date.parse(`${date}-01`)) {
    return { notFound: true };
  } else if (/^\d{4}$/.test(date)) {
    posts = await getPostsDate({ year: date });
  } else if (/^\d{4}-\d{2}$/.test(date)) {
    posts = await getPostsDate({ yearMonth: date });
  } else {
    return { notFound: true };
  }

  return {
    props: {
      date,
      posts,
    },
  };
}

const RenderPostsBeforeDate = ({ date, posts = [], redirect }) => {
  const router = useRouter();

  useEffect(() => {
    if (redirect && !posts) {
      router.replace(redirect);
    }
  }, [router, redirect, posts]);

  if (!posts) {
    return <PostsNotFound />;
  }

  return (
    <Layout>
      <DocumentHead description={`Post archive ${date.split("T")[0]}`} />
      <div className={styles.container}>
        <header>
          <h2>Posts archive {date.split("T")[0]}</h2>
        </header>

        <div className={styles.mainContent}>
          <NoContents contents={posts} />

          <BlogContents posts={posts} />
        </div>
      </div>
    </Layout>
  );
};

export default RenderPostsBeforeDate;
