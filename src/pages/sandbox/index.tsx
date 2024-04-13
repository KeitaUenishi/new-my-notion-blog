import { InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import React from "react";

import DocumentHead from "@/components/document-head";
import { Layout } from "@/components/layout/Layout";
import { pageTitles } from "@/constants/sandbox";
import { getFileNames } from "@/server/getFileNames";
import styles from "@/styles/sandbox.module.css";

export const getStaticProps = async () => {
  const paths = getFileNames("./src/pages/sandbox", ["index"]);

  return {
    props: {
      paths: {
        pages: paths,
      },
    },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SandBox: NextPage<Props> = ({ paths }) => {
  // TODO: レスポンシブレイアウトの調整
  return (
    <Layout>
      <DocumentHead title="SandBox" />
      <div className={styles.container}>
        <p className={styles.title}>sandbox</p>
        <p>いろんな個人的遊びをまとめたページ</p>
        <article className={styles.contents}>
          {paths.pages.map((path, idx) => {
            return (
              <Link key={`${path}-${idx}`} href={`/sandbox/${path}`}>
                <div className={styles.sandboxContainer}>{pageTitles[path]}</div>
              </Link>
            );
          })}
        </article>
      </div>
    </Layout>
  );
};

export default SandBox;
