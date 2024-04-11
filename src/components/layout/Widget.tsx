import React, { useEffect } from "react";
import { FaSearch } from "react-icons/fa";

import styles from "@/styles/components/layout/widget.module.css";

export const Widget: React.FC = () => {
  useEffect(() => {});
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
      </div>
      <div className={styles.content}>
        <h3>月別アーカイブ</h3>
        <ol>
          <li>2024年</li>
          <li>2024年</li>
          <li>2024年</li>
          <li>2024年</li>
          <li>2024年</li>
          <li>2024年</li>
        </ol>
      </div>
    </div>
  );
};
