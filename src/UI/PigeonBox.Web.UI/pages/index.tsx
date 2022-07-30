/** @format */

import { Container } from "@mui/material";
import { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import nookies from "nookies";
import { useContext, useEffect } from "react";
import ChatBox from "../src/components/ChatBoxLayout";
import { AuthContext } from "../src/shared/contexts/AuthProvider";
import { ChatProvider } from "../src/shared/contexts/ChatProvider";

const Chat: NextPage = () => {
  const { User, GetUser } = useContext(AuthContext);
  const router = useRouter();

  const ValidateUser = async () => {
    if (!User) {
      const logged = await GetUser();

      if (logged == false) {
        await router.push("/authentication", "");
      }
    }
  };

  useEffect(() => {
    ValidateUser();
  }, []);

  return (
    <Container>
      <ChatProvider>
        <ChatBox />
      </ChatProvider>
    </Container>
  );
};

export default Chat;

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx)["TkCredUsr"];

  if (!cookies)
    return {
      redirect: {
        permanent: false,
        destination: "/authentication",
      },
      props: {},
    };

  return {
    props: {},
  };
};
