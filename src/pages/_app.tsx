import { Navbar } from "@/components";
import FooterComponent from "@/components/Footer/FooterComponent";
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

            {typeof window !== "undefined" &&
            (window.location.pathname === "/" ||
              window.location.pathname === "/index") ? null : (
              <Navbar />
            )}
            <Component {...pageProps} />
            {process.env.NODE_ENV !== "production" ||
            (typeof window !== "undefined" &&
              window.location.pathname !== "/index") ? (
              <FooterComponent />
            ) : null}
            <GlobalStyles />
          </AlertProvider>
        </div>
      )}
    </ThemeProvider>
  );
}
