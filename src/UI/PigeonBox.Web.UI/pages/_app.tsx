/** @format */

import type { AppProps } from "next/app";
import "../src/global/global.css";
import WrapperLayout from "../src/components/WrapperLayout";
import { AuthProvider } from "../src/shared/contexts/AuthProvider";
import { ChatProvider } from "../src/shared/contexts/ChatProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <WrapperLayout>
        <ChatProvider>
          <Component {...pageProps} />
        </ChatProvider>
      </WrapperLayout>
    </AuthProvider>
  );
}

export default MyApp;
