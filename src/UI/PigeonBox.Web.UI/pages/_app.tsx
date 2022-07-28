/** @format */

import type { AppProps } from "next/app";
import "../src/global/global.css";
import WrapperLayout from "../src/components/WrapperLayout";
import { AuthProvider } from "../src/shared/contexts/AuthProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <WrapperLayout>
        <Component {...pageProps} />
      </WrapperLayout>
    </AuthProvider>
  );
}

export default MyApp;
