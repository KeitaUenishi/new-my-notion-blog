import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { TagLinkList } from "@/components/ui/tag/TagList";
import styles from "@/styles/components/layout/widget.module.css";

type Archive = {
  year: string;
  count: number;
  months: { month: string; count: number }[];
  isOpenMonth: boolean;
};

export const Widget = () => {
  const router = useRouter();
  const [searchForm, setSearchForm] = React.useState<string>("");
  const [archive, setArchive] = React.useState<Archive[]>([]);
  const [tags, setTags] = React.useState<string[]>([]);

  const handleYearClick = (accYear: Archive) => {
    const newArchive = archive.map((arc) => {
      if (arc.year === accYear.year) {
        return { ...arc, isOpenMonth: !arc.isOpenMonth };
      }
      return arc;
    });
    setArchive(newArchive);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({ pathname: "/posts/search", query: { q: searchForm } });
  };

  useEffect(() => {
    (async () => {
      const [archive, tags] = await Promise.all([fetch("/blog_archive_data.json"), fetch("/tags_data.json")]).then(
        async (res) => {
          return Promise.all(res.map(async (r) => await r.json()));
        },
      );
      const initArchiveData = archive.map((year) => ({ ...year, isOpenMonth: false }));
      setArchive(initArchiveData);
      setTags(tags);
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
        <h3>検索</h3>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="text"
            placeholder="キーワードを入力"
            aria-label="キーワードを入力"
            onChange={(e) => setSearchForm(e.target.value)}
          />
        </form>
      </div>
      <div className={styles.content}>
        <h3>タグ</h3>
        <TagLinkList tags={tags} />
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
