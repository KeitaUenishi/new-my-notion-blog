import Link from "next/link";
import React from "react";

import styles from "./blog-card.module.css";

import { PostDate, PostTags, PostTitle } from "@/components/ui/blog/blog-parts";
import { getBlogLink } from "@/lib/blog-helpers";

export const BlogCard = ({ post }) => {
  return (
    <Link href={getBlogLink(post.Slug)} key={post.Slug} legacyBehavior>
      <article className={styles.postContainer}>
        <div className={styles.post} key={post.Slug}>
          <PostDate post={post} />
          <PostTags post={post} />
          <PostTitle post={post} />
        </div>
      </article>
    </Link>
  );
};
