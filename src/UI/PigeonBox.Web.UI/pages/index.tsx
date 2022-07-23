/** @format */

import { Container } from "@mui/material";
import { NextPage } from "next";
import ChatBox from "../src/components/ChatBox";
import styles from "./styles.module.css";

const Chat: NextPage = () => {
  return (
    <Container>
      <ChatBox />
    </Container>
  );
};

export default Chat;
