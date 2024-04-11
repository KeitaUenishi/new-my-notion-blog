import { useState } from "react";

import DocumentHead from "@/components/document-head";
import BlogContents from "@/components/layout/BlogContents";
import { Layout } from "@/components/layout/Layout";
import { BlogTagLink, NextPageLink } from "@/components/ui/blog/blog-parts";
import { InnerNav } from "@/components/ui/nav/InnerNav";
import { getArchive } from "@/lib/getArchive";
import { getPosts, getFirstPost, getRankedPosts, getAllTags, getAllPosts } from "@/lib/notion/client";
import styles from "@/styles/page.module.css";

export async function getStaticProps() {
  const [posts, allPosts, firstPost, rankedPosts, tags] = await Promise.all([
    getPosts(),
    getAllPosts(),
    getFirstPost(),
    getRankedPosts(),
    getAllTags(),
  ]);

  const archive = getArchive(allPosts);

  return {
    props: {
      posts,
      allPosts,
      firstPost,
      rankedPosts,
      tags,
      archive,
    },
    revalidate: 60,
  };
}

const displayType = {
  blog: "blog",
  tags: "tag",
};

const RenderPosts = ({ posts = [], firstPost, tags = [], archive }) => {
  const [display, setDisplay] = useState<string>(displayType.blog);
  const navContents = [
    { title: "posts", func: () => setDisplay(displayType.blog) },
    { title: "tags", func: () => setDisplay(displayType.tags) },
  ];
  return (
    <Layout archive={archive}>
      <DocumentHead title="Blog" />
      <div className={styles.container}>
        <InnerNav navItems={navContents} />

        {display === displayType.blog && <BlogContents posts={posts} />}
        {display === displayType.tags && <BlogTagLink heading="Categories" tags={tags} />}
        {display === displayType.blog && (
          <footer>
            <NextPageLink firstPost={firstPost} posts={posts} />
          </footer>
        )}
      </div>
    </Layout>
  );
};

export default RenderPosts;
