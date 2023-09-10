import React from 'react'
import { InferGetStaticPropsType, NextPage } from 'next'
import Link from 'next/link'
import { Button } from '@mui/material'
import DocumentHead from '@/components/document-head'
import styles from '@/styles/sandbox.module.css'
import { getFileNames } from '@/server/getFileNames'

export const getStaticProps = async () => {
  const paths = getFileNames('./src/pages/sandbox', ['index'])
  return {
    props: {
      paths: {
        pages: paths,
      },
    },
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

const SandBox: NextPage<Props> = ({ paths }) => {
  return (
    <div>
      <DocumentHead title="SandBox" />
      <div className={styles.container}>
        <p className={styles.title}>sandbox</p>
        <p>いろんな個人的遊びをまとめたページ</p>
        {paths.pages.map((path) => {
          return (
            <ol key={path}>
              <Link href={`/sandbox/${path}`}>
                <Button
                  style={{ textTransform: 'none', borderRadius: '32px' }}
                  variant="outlined"
                >
                  {path}
                </Button>
              </Link>
            </ol>
          )
        })}
      </div>
    </div>
  )
}

export default SandBox
