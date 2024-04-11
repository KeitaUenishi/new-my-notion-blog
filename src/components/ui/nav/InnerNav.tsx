import React from "react";

import styles from "@/styles/components/ui/nav.module.css";

type Props = {
  navItems: {
    title: string;
    func: () => void;
  }[];
};

export const InnerNav = ({ navItems }: Props) => {
  return (
    <div className={styles.navContainer}>
      <nav className={styles.navbar}>
        {navItems.map((item) => (
          <a onClick={item.func}>{item.title}</a>
        ))}
      </nav>
    </div>
  );
};
