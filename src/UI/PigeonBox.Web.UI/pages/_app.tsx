/** @format */

import type { AppProps } from "next/app";
import "../src/global/global.css";
import WrapperLayout from "../src/components/WrapperLayout";
import { ChatProvider } from "../src/shared/contexts/ChatProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChatProvider>
      <WrapperLayout>
        <Component {...pageProps} />
      </WrapperLayout>
    </ChatProvider>
  );
}

export default MyApp;
