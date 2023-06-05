import DocumentHead from '@/components/document-head'
import { NoContents } from '@/components/blog-parts'
import { getPosts } from '@/lib/notion/client'
import styles from '@/styles/page.module.css'
import { BlogCard } from '@/components/blog/blogCard'
import Link from 'next/link'

export async function getStaticProps() {
  const posts = await getPosts()

  return {
    props: {
      posts,
    },
    revalidate: 60,
  }
}

const RenderPage = ({ posts = [] }) => {
  return (
    <div className={styles.container}>
      <DocumentHead />
      <div className={styles.blogContainer}>
        <div className={styles.mainContent}>
          <NoContents contents={posts} />

          {posts.map((post) => {
            return <BlogCard key={post.Slug} post={post} />
          })}
        </div>
        <footer>
          <div className={styles.postPageLink}>
            <Link href="/posts" passHref>
              ブログ一覧へ
            </Link>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default RenderPage
