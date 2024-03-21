import Link from "next/link";
import React from "react";

import styles from "@/styles/components/layout/navbar.module.css";

interface NavItem {
  label: string;
  path: string;
}

export const NavMenu = () => {
  const navItems: NavItem[] = [
    { label: "Home", path: "/" },
    { label: "Posts", path: "/posts" },
    { label: "SandBox", path: "/sandbox" },
  ];

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <ul>
          {navItems.map(({ label, path }) => {
            return (
              <li key={label}>
                <Link href={path} passHref>
                  <a>{label}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
