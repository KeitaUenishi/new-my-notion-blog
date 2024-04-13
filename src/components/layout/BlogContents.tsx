import { NoContents } from "../ui/blog/blog-parts";
import { BlogCard } from "../ui/blog/blogCard";

import styles from "@/styles/components/layout/blogContents.module.css";

const BlogContents = ({ posts }: { posts: any[] }) => {
  return (
    <div className={styles.mainContent}>
      <NoContents contents={posts} />
      {posts.map((post) => {
        return <BlogCard key={post.Slug} post={post} />;
      })}
    </div>
  );
};

export default BlogContents;
