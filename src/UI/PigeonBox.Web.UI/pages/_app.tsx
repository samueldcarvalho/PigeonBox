/** @format */

import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import DarkTheme from "../src/shared/themes/Dark";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={DarkTheme}>
      <CssBaseline />
      <Box
        width="100vw"
        height="100vh"
        style={{
          background: `linear-gradient(to bottom, ${DarkTheme.palette.primary.main}, black)`,
        }}
      >
        <Component {...pageProps} />;
      </Box>
    </ThemeProvider>
  );
}

export default MyApp;
