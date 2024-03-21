import React from "react";
import styles from "@/styles/hero.module.css";

export const Hero: React.FC = () => {
  return (
    <div className={styles.container}>
      <div>
        <h1 style={{ maxWidth: "28rem" }}>Uenishi.Web</h1>
        <p>大阪に生息しているプログラマーのブログ</p>
      </div>
    </div>
  );
};
