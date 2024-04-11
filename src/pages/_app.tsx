import "@/styles/global.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { UiProvider } from "@/components/base/UiProvider";
import GoogleAnalytics from "@/components/google-analytics";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Hero } from "@/components/layout/Hero";
import { Widget } from "@/components/layout/Widget";
import * as gtag from "@/lib/gtag";
import "@/styles/syntax-coloring.css";
import styles from "@/styles/shared.module.css";

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (location.host !== "localhost") {
        gtag.pageview(pageProps.title, url);
      }
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, pageProps.title]);

  return (
    <UiProvider>
      <GoogleAnalytics />
      <Header />
      <div className={styles.container}>
        <main className={styles.mainContainer}>
          <Hero />
          <Component {...pageProps} />
        </main>
        <aside className={styles.sidebarContent}>
          <Widget />
        </aside>
      </div>
      <Footer />
    </UiProvider>
  );
};

export default App;
