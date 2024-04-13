import Link from "next/link";

import { getTagLink } from "@/lib/blog-helpers";
import styles from "@/styles/components/ui/tag/tagList.module.css";

export const TagLinkList = ({ tags }) => {
  if (!tags || tags.length === 0) return null;

  return (
    <ul className={styles.postTagList}>
      {tags.map((tag: string) => {
        return (
          <li className={styles.tagListContainer} key={tag}>
            <Link href="/posts/tag/[tag]" as={getTagLink(tag)} passHref>
              {tag}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
