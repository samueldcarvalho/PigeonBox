/** @format */

import type { AppProps } from "next/app";
import "../src/global/global.css";
import WrapperLayout from "../src/components/WrapperLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WrapperLayout>
      <Component {...pageProps} />
    </WrapperLayout>
  );
}

export default MyApp;
