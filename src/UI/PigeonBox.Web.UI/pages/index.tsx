/** @format */

import { Container } from "@mui/material";
import { NextPage } from "next";
import ChatBox from "../src/components/ChatBox";

const Chat: NextPage = () => {
  return (
    <Container>
      <ChatBox />
    </Container>
  );
};

export default Chat;
