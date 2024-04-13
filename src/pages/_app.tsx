import "@/styles/global.css";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import { useEffect } from "react";

import { UiProvider } from "@/components/base/UiProvider";
import GoogleAnalytics from "@/components/google-analytics";
import * as gtag from "@/lib/gtag";
import "@/styles/syntax-coloring.css";

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
      <NextNProgress stopDelayMs={200} height={4} showOnShallow={true} />
      <Component {...pageProps} />
    </UiProvider>
  );
};

export default App;
