import axios from "axios";
import React from "react";
import useSWR from "swr";

import DocumentHead from "@/components/document-head";
import { Layout } from "@/components/layout/Layout";
import {
  BlogPostLink,
  NoContents,
  PostBody,
  PostDate,
  PostTags,
  PostTitle,
  PostsNotFound,
} from "@/components/ui/blog/blog-parts";
import SocialButtons from "@/components/ui/button/social-buttons";
import { getBlogLink } from "@/lib/blog-helpers";
import { getArchive } from "@/lib/getArchive";
import {
  getPosts,
  getAllPosts,
  getRankedPosts,
  getPostBySlug,
  getPostsByTag,
  getAllTags,
  getAllBlocksByBlockId,
} from "@/lib/notion/client";
import { Block } from "@/lib/notion/interfaces";
import { Post } from "@/lib/notion/interfaces";
import { NEXT_PUBLIC_URL } from "@/lib/notion/server-constants";
import styles from "@/styles/blog-page.module.css";

export async function getStaticProps({ params: { slug } }) {
  const post = await getPostBySlug(slug);

  if (!post) {
    console.log(`Failed to find post for slug: ${slug}`);
    return {
      props: {
        redirect: "/",
      },
      revalidate: 30,
    };
  }

  const [blocks, rankedPosts, recentPosts, tags, sameTagPosts, allPosts] = await Promise.all([
    getAllBlocksByBlockId(post.PageId),
    getRankedPosts(),
    getPosts(5),
    getAllTags(),
    getPostsByTag(post.Tags[0], 6),
    getAllPosts(),
  ]);

  const fallback = {};
  fallback[slug] = blocks;

  const archive = getArchive(allPosts);

  return {
    props: {
      slug,
      post,
      rankedPosts,
      recentPosts,
      tags,
      sameTagPosts: sameTagPosts.filter((p: Post) => p.Slug !== post.Slug),
      fallback,
      archive,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts();
  return {
    paths: posts.map((post) => getBlogLink(post.Slug)),
    fallback: "blocking",
  };
}

const fetchBlocks = async (slug: string): Promise<Array<Block>> => {
  try {
    const { data: blocks } = await axios.get(`/api/blocks?slug=${slug}`);
    return blocks as Array<Block>;
  } catch (error) {
    console.log(error);
  }
};

const includeExpiredImage = (blocks: Array<Block>): boolean => {
  const now = Date.now();

  return blocks.some((block) => {
    if (block.Type === "image") {
      const image = block.Image;
      if (image.File && image.File.ExpiryTime && Date.parse(image.File.ExpiryTime) < now) {
        return true;
      }
    }
    // TODO: looking for the image block in Children recursively
    return false;
  });
};

const RenderPost = ({ slug, post, rankedPosts = [], recentPosts = [], sameTagPosts = [], archive = [], fallback }) => {
  const { data: blocks, error } = useSWR(includeExpiredImage(fallback[slug]) && slug, fetchBlocks, {
    fallbackData: fallback[slug],
  });

  if (error || !blocks) {
    return <PostsNotFound />;
  }

  return (
    <Layout archive={archive}>
      <div className={styles.container}>
        <DocumentHead title={post.Title} description={post.Excerpt} />

        <article className={styles.mainContent}>
          <div className={styles.post}>
            <PostDate post={post} />
            <PostTags post={post} />
            <PostTitle post={post} enableLink={false} />

            <NoContents contents={blocks} />
            <PostBody blocks={blocks} />

            <footer>
              {NEXT_PUBLIC_URL && (
                <SocialButtons
                  title={post.Title}
                  url={new URL(getBlogLink(post.Slug), NEXT_PUBLIC_URL).toString()}
                  id={post.Slug}
                />
              )}
            </footer>
          </div>
        </article>

        <div className={styles.subContent}>
          <BlogPostLink heading="Posts in the same category" posts={sameTagPosts} />
          <BlogPostLink heading="Recommended" posts={rankedPosts} />
          <BlogPostLink heading="Latest posts" posts={recentPosts} />
        </div>
      </div>
    </Layout>
  );
};

export default RenderPost;
