import React from "react";
import Link from "next/link";
import { PostDate, PostTags, PostTitle } from "@/components/ui/blog/blog-parts";
import { getBlogLink } from "@/lib/blog-helpers";
import styles from "./blog-card.module.css";

export const BlogCard = ({ post }) => {
  return (
    <Link href={getBlogLink(post.Slug)} key={post.Slug}>
      <div className={styles.postContainer}>
        <div className={styles.post} key={post.Slug}>
          <PostDate post={post} />
          <PostTags post={post} />
          <PostTitle post={post} />
        </div>
      </div>
    </Link>
  );
};
