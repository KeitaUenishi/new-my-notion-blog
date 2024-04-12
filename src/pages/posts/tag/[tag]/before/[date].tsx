import { useRouter } from "next/router";
import React, { useEffect } from "react";

import DocumentHead from "@/components/document-head";
import BlogContents from "@/components/layout/BlogContents";
import { Layout } from "@/components/layout/Layout";
import { NextPageLink, NoContents, PostsNotFound } from "@/components/ui/blog/blog-parts";
import { getPostsByTagBefore, getFirstPostByTag } from "@/lib/notion/client";
import { NUMBER_OF_POSTS_PER_PAGE } from "@/lib/notion/server-constants";
import styles from "@/styles/blog.module.css";

export async function getStaticProps({ params: { tag, date } }) {
  if (!Date.parse(date) || !/\d{4}-\d{2}-\d{2}/.test(date)) {
    return { notFound: true };
  }

  const posts = await getPostsByTagBefore(tag, date, NUMBER_OF_POSTS_PER_PAGE);

  if (posts.length === 0) {
    console.log(`Failed to find posts for tag: ${tag}`);
    return {
      props: {
        redirect: "/",
      },
      revalidate: 30,
    };
  }

  const [firstPost] = await Promise.all([getFirstPostByTag(tag)]);

  return {
    props: {
      date,
      posts,
      firstPost,
      tag,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

const RenderPostsByTagBeforeDate = ({ date, posts = [], firstPost, tag, redirect }) => {
  const router = useRouter();

  useEffect(() => {
    if (redirect && posts.length === 0) {
      router.replace(redirect);
    }
  }, [router, redirect, posts]);

  if (!posts) {
    return <PostsNotFound />;
  }

  return (
    <Layout>
      <DocumentHead description={`Posts in ${tag} before ${date}`} />
      <div className={styles.container}>
        <header>
          <h2>{tag}</h2>
        </header>

        <div className={styles.mainContent}>
          <NoContents contents={posts} />

          <BlogContents posts={posts} />
        </div>
        <footer>
          <NextPageLink firstPost={firstPost} posts={posts} tag={tag} />
        </footer>
      </div>
    </Layout>
  );
};

export default RenderPostsByTagBeforeDate;
