import { useState } from "react";

import DocumentHead from "@/components/document-head";
import { BlogTagLink, NextPageLink, NoContents } from "@/components/ui/blog/blog-parts";
import { BlogCard } from "@/components/ui/blog/blogCard";
import { getPosts, getFirstPost, getRankedPosts, getAllTags } from "@/lib/notion/client";
import blogStyles from "@/styles/blog.module.css";
import styles from "@/styles/page.module.css";

export async function getStaticProps() {
  const [posts, firstPost, rankedPosts, tags] = await Promise.all([
    getPosts(),
    getFirstPost(),
    getRankedPosts(),
    getAllTags(),
  ]);

  return {
    props: {
      posts,
      firstPost,
      rankedPosts,
      tags,
    },
    revalidate: 60,
  };
}

const displayType = {
  blog: "blog",
  tags: "tag",
};

const RenderPosts = ({ posts = [], firstPost, tags = [] }) => {
  const [display, setDisplay] = useState<string>(displayType.blog);
  return (
    <div className={styles.container}>
      <div className={blogStyles.container}>
        <DocumentHead title="Blog" />

        <div className={blogStyles.navContainer}>
          <nav className={blogStyles.navbar}>
            <a onClick={() => setDisplay(displayType.blog)}>posts</a>
            <a onClick={() => setDisplay(displayType.tags)}>tags</a>
          </nav>
        </div>

        {/** TODO: page側と共通化する */}
        {display === displayType.blog && (
          <>
            <div className={blogStyles.mainContent}>
              <NoContents contents={posts} />
              {posts.map((post) => {
                return <BlogCard key={post.Slug} post={post} />;
              })}
            </div>
            <div className={blogStyles.subContent}></div>
          </>
        )}
        {display === displayType.tags && <BlogTagLink heading="Categories" tags={tags} />}
      </div>
      {display === displayType.blog && (
        <footer>
          <NextPageLink firstPost={firstPost} posts={posts} />
        </footer>
      )}
    </div>
  );
};

export default RenderPosts;
