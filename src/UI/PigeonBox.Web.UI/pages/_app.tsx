/** @format */

import type { AppProps } from "next/app";
import "../src/global/global.css";
import WrapperLayout from "../src/components/WrapperLayout";
import { ChatProvider } from "../src/shared/contexts/ChatProvider";
import { AuthProvider } from "../src/shared/contexts/AuthProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ChatProvider>
        <WrapperLayout>
          <Component {...pageProps} />
        </WrapperLayout>
      </ChatProvider>
    </AuthProvider>
  );
}

export default MyApp;
