/** @format */

import { Container } from "@mui/material";
import { GetServerSidePropsContext, NextPage } from "next";
import nookies from "nookies";
import ChatBox from "../src/components/ChatBoxLayout";
import { ChatProvider } from "../src/shared/contexts/ChatProvider";

const Chat: NextPage = () => {
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
