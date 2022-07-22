/** @format */

import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import DarkTheme from "../src/shared/themes/Dark";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={DarkTheme}>
      <Component {...pageProps} />;
    </ThemeProvider>
  );
}

export default MyApp;
