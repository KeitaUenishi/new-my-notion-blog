import Link from "next/link";
import React from "react";

import { getBeforeLink, getBlogLink, getDateStr, getTagLink, getTagBeforeLink } from "../../../lib/blog-helpers";
import { Post } from "../../../lib/notion/interfaces";
import NotionBlocks from "../../notion-block";

import styles from "@/styles/blog-parts.module.css";

export const PostDate = ({ post }) => <div className={styles.postDate}>{post.Date ? getDateStr(post.Date) : ""}</div>;

export const PostTitle = ({ post, enableLink = true }) => {
  const postTitle = post.Title ? post.Title : "";

  return (
    <h3 className={styles.postTitle}>
      {enableLink ? (
        <Link href="/posts/[slug]" as={getBlogLink(post.Slug)} passHref>
          {postTitle}
        </Link>
      ) : (
        postTitle
      )}
    </h3>
  );
};

export const PostTags = ({ post }) => (
  <div className={styles.postTags}>
    {post.Tags &&
      post.Tags.length > 0 &&
      post.Tags.map((tag: string) => (
        <Link href="/posts/tag/[tag]" as={getTagLink(tag)} key={tag} passHref>
          {tag}
        </Link>
      ))}
  </div>
);

export const PostExcerpt = ({ post }) => (
  <div className={styles.postExcerpt}>
    <p>{post.Excerpt ? post.Excerpt : ""}</p>
  </div>
);

export const PostBody = ({ blocks }) => (
  <div className={styles.postBody}>
    <NotionBlocks blocks={blocks} />
  </div>
);

export const ReadMoreLink = ({ post }) => (
  <div className={styles.readMoreLink}>
    <Link
      href="/posts/[slug]"
      as={getBlogLink(post.Slug)}
      passHref
      className={styles.readMore}>
      Read more
    </Link>
  </div>
);

export const NextPageLink = ({ firstPost, posts, tag = "" }) => {
  if (!firstPost) return null;
  if (posts.length === 0) return null;

  const lastPost = posts[posts.length - 1];

  if (firstPost.Date === lastPost.Date) return null;

  return (
    <div className={styles.nextPageLink}>
      <Link
        href={tag ? "/tag/[tag]/before/[date]" : "/posts/before/[date]"}
        as={tag ? getTagBeforeLink(tag, lastPost.Date) : getBeforeLink(lastPost.Date)}
        passHref
      >
        次へ ＞
      </Link>
    </div>
  );
};

export const NoContents = ({ contents }) => {
  if (!!contents && contents.length > 0) return null;

  return <div className={styles.noContents}>条件に一致するコンテンツがありませんでした</div>;
};

export const BlogPostLink = ({ heading, posts }) => (
  <div className={styles.blogPostLink}>
    <h3>{heading}</h3>
    <NoContents contents={posts} />
    <PostLinkList posts={posts} />
  </div>
);

export const PostLinkList = ({ posts }) => {
  if (!posts || posts.length === 0) return null;

  return (
    <ul>
      {posts.map((post: Post) => {
        return (
          <li key={post.Slug}>
            <Link href="/posts/[slug]" as={getBlogLink(post.Slug)} passHref>
              {post.Title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export const PostsNotFound = () => (
  <div className={styles.postsNotFound}>Woops! did not find the posts, redirecting you back to the blog index</div>
);
