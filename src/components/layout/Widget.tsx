import Link from "next/link";
import React, { useEffect } from "react";
import { FaSearch } from "react-icons/fa";

import styles from "@/styles/components/layout/widget.module.css";

type Archive = {
  year: string;
  count: number;
  months: { month: string; count: number }[];
  isOpenMonth: boolean;
};

export const Widget = () => {
  const [archive, setArchive] = React.useState<Archive[]>([]);

  const handleYearClick = (accYear: Archive) => {
    const newArchive = archive.map((arc) => {
      if (arc.year === accYear.year) {
        return { ...arc, isOpenMonth: !arc.isOpenMonth };
      }
      return arc;
    });
    setArchive(newArchive);
  };

  useEffect(() => {
    (async () => {
      const res = await fetch("/blog_archive_data.json");
      const data = await res.json();
      const initialData = data.map((year) => ({ ...year, isOpenMonth: false }));
      setArchive(initialData);
    })();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>KeitaUenishi</h2>
        <div>
          <a href="https://twitter.com/uk092908">X (Twitter)</a>
        </div>
        <div>
          <a href="https://github.com/KeitaUenishi">GitHub</a>
        </div>
        <div>
          お問合せは
          <a href="https://forms.gle/CrHs3o9zUENjG6RU9">こちら</a>
          よりお願いします
        </div>
      </div>
      <div className={styles.content}>
        {/** TODO: レスポンシブ時のアイコン */}
        <h3>検索</h3>
        <input type="text" placeholder="記事を検索" />
        <span className={styles.searchIcon}>
          <FaSearch size={18} color="black" />
        </span>
      </div>
      <div className={styles.content}>
        <h3>タグ</h3>
        {/* {tags.map((tag) => (
          <div key={tag}>
            <a href="#">{tag}</a>
          </div>
        ))} */}
      </div>
      <div className={styles.content}>
        <h3>月別アーカイブ</h3>
        <ol className={styles.archive}>
          {archive.map((arcYear) => {
            const displayYear = `${arcYear.year} (${arcYear.count})`;
            return (
              <li key={arcYear.year}>
                <span className={styles.archiveYear} onClick={() => handleYearClick(arcYear)}>
                  {arcYear.isOpenMonth ? "▼" : "▶︎"}
                </span>
                <Link href={`/posts/archive/${arcYear.year}`}>
                  <a>{displayYear}</a>
                </Link>

                {arcYear.isOpenMonth && (
                  <ol className={styles.archive}>
                    {arcYear.months.map((arcMonth) => {
                      const displayMonth = `${arcMonth.month} (${arcMonth.count})`;
                      return (
                        <li key={arcMonth.month}>
                          <Link href={`/posts/archive/${arcMonth.month}`}>
                            <a>{displayMonth}</a>
                          </Link>
                        </li>
                      );
                    })}
                  </ol>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};
