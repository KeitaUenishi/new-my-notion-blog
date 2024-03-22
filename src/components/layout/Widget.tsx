import React from "react";

import styles from "@/styles/components/layout/widget.module.css";

export const Widget: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2>サイドバー</h2>
      <div className={styles.content}>
        <h3>検索</h3>
        <input type="text" placeholder="search" />
      </div>
      <div className={styles.content}>
        <h3>タグ</h3>
        <div>tagu</div>
        <div>tagu</div>
        <div>tagu</div>
        <div>tagu</div>
        <div>tagu</div>
        <div>tagu</div>
        <div>tagu</div>
        <div>tagu</div>
        <div>tagu</div>
        <div>tagu</div>
        <div>tagu</div>
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
