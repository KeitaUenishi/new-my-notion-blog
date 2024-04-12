import { useRouter } from "next/router";
import React, { useEffect } from "react";

import DocumentHead from "@/components/document-head";
import BlogContents from "@/components/layout/BlogContents";
import { Layout } from "@/components/layout/Layout";
import { NextPageLink, NoContents, PostsNotFound } from "@/components/ui/blog/blog-parts";
import { getBeforeLink } from "@/lib/blog-helpers";
import { getPosts, getPostsBefore, getFirstPost } from "@/lib/notion/client";
import { NUMBER_OF_POSTS_PER_PAGE } from "@/lib/notion/server-constants";
import styles from "@/styles/blog.module.css";

export async function getStaticProps({ params: { date } }) {
  if (!Date.parse(date) || !/\d{4}-\d{2}-\d{2}/.test(date)) {
    return { notFound: true };
  }

  const [posts, firstPost] = await Promise.all([getPostsBefore(date, NUMBER_OF_POSTS_PER_PAGE), getFirstPost()]);

  return {
    props: {
      date,
      posts,
      firstPost,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const posts = await getPosts();
  const path = getBeforeLink(posts[posts.length - 1].Date);

  return {
    paths: [path],
    fallback: "blocking",
  };
}

const RenderPostsBeforeDate = ({ date, posts = [], firstPost, redirect }) => {
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
      <DocumentHead description={`Post before ${date.split("T")[0]}`} />
      <div className={styles.container}>
        <header>
          <h2>Posts before {date.split("T")[0]}</h2>
        </header>

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

export default RenderPostsBeforeDate;
