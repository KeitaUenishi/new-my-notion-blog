import { Button } from "@mui/material";
import { InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import React from "react";

import DocumentHead from "@/components/document-head";
import { Layout } from "@/components/layout/Layout";
import { getArchive } from "@/lib/getArchive";
import { getAllPosts } from "@/lib/notion/client";
import { getFileNames } from "@/server/getFileNames";
import styles from "@/styles/sandbox.module.css";

export const getStaticProps = async () => {
  const paths = getFileNames("./src/pages/sandbox", ["index"]);
  const allPosts = await Promise.all([getAllPosts()]);

  const archive = getArchive(allPosts);
  return {
    props: {
      archive,
      paths: {
        pages: paths,
      },
    },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SandBox: NextPage<Props> = ({ archive, paths }) => {
  // TODO: sandboxのサイドバーどうする？
  return (
    <Layout archive={archive}>
      <DocumentHead title="SandBox" />
      <div className={styles.container}>
        <p className={styles.title}>sandbox</p>
        <p>いろんな個人的遊びをまとめたページ</p>
        {paths.pages.map((path) => {
          return (
            <ol key={path}>
              <Link href={`/sandbox/${path}`}>
                <Button style={{ textTransform: "none", borderRadius: "32px" }} variant="outlined">
                  {path}
                </Button>
              </Link>
            </ol>
          );
        })}
      </div>
    </Layout>
  );
};

export default SandBox;
