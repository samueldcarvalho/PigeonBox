/** @format */

import { Container } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import nookies from "nookies";
import ChatBox from "../src/components/ChatBoxLayout";

const Chat: NextPage = () => {
  return (
    <Container>
      <ChatBox />
    </Container>
  );
};

export default Chat;

export const getServerSideProps = (ctx: any) => {
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
