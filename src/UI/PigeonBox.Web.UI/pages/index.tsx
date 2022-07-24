/** @format */

import { Container } from "@mui/material";
import { NextPage } from "next";
import ChatBox from "../src/components/ChatBoxLayout";

const Chat: NextPage = () => {
  return (
    <Container>
      <ChatBox />
    </Container>
  );
};

export default Chat;
