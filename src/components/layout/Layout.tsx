import Footer from "./Footer";
import Header from "./Header";
import { Hero } from "./Hero";
import { Widget } from "./Widget";

import styles from "@/styles/shared.module.css";

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <main className={styles.mainContainer}>
          <Hero />
          {children}
        </main>
        <aside className={styles.sidebarContent}>
          <Widget />
        </aside>
      </div>
      <Footer />
    </>
  );
};
