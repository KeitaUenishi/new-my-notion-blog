import { useRouter } from "next/router";
import { useEffect } from "react";

import DocumentHead from "@/components/document-head";
import BlogContents from "@/components/layout/BlogContents";
import { Layout } from "@/components/layout/Layout";
import { NextPageLink, NoContents, PostsNotFound } from "@/components/ui/blog/blog-parts";
import { getTagLink } from "@/lib/blog-helpers";
import { getPosts, getPostsByTag, getFirstPostByTag, getAllTags } from "@/lib/notion/client";
import { NUMBER_OF_POSTS_PER_PAGE } from "@/lib/notion/server-constants";
import styles from "@/styles/blog.module.css";

export async function getStaticProps({ params: { tag } }) {
  const posts = await getPostsByTag(tag, NUMBER_OF_POSTS_PER_PAGE);

  if (posts.length === 0) {
    console.log(`Failed to find posts for tag: ${tag}`);
    return {
      props: {
        redirect: "/",
      },
      revalidate: 30,
    };
  }

  const [firstPost, recentPosts, tags] = await Promise.all([getFirstPostByTag(tag), getPosts(5), getAllTags()]);

  return {
    props: {
      posts,
      firstPost,
      recentPosts,
      tags,
      tag,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const tags = await getAllTags();

  return {
    paths: tags.map((tag) => getTagLink(tag)),
    fallback: "blocking",
  };
}

const RenderPostsByTags = ({ tag, posts = [], firstPost, redirect }) => {
  const router = useRouter();

  useEffect(() => {
    if (redirect && posts.length === 0) {
      router.replace(redirect);
    }
  }, [router, redirect, posts]);

  if (!posts) {
    return <PostsNotFound />;
  }
  // TODO: レイアウトの修正
  return (
    <Layout>
      <div className={styles.container}>
        <DocumentHead description={`Posts in ${tag}`} />
        <header>
          <h2>{tag}</h2>
        </header>

        <div className={styles.mainContent}>
          <NoContents contents={posts} />

          <BlogContents posts={posts} />

          <footer>
            <NextPageLink firstPost={firstPost} posts={posts} tag={tag} />
          </footer>
        </div>
      </div>
    </Layout>
  );
};

export default RenderPostsByTags;
