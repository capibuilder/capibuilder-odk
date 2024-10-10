import { Navbar } from "@/components";
import FooterComponent from "@/components/Footer/FooterComponent";
import StickyBanner from "@/components/StickyBanner";
import GlobalStyles, { theme } from "@/styles/globals";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { useEffect, useState } from "react";
import { AlertProvider } from "socialwell-design";
import { ThemeProvider } from "styled-components";

import "../styles/animation.css";
import "../styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {mounted && (
        <div>
          <AlertProvider>
            <NextNProgress color="var(--primary-color)" />
            <StickyBanner />
            <Navbar />
            <Component {...pageProps} />
            <FooterComponent />
            <GlobalStyles />
          </AlertProvider>
        </div>
      )}
    </ThemeProvider>
  );
}
