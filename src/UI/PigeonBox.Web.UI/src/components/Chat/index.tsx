/** @format */

import { IoMdSend } from "react-icons/io";
import { motion } from "framer-motion";

import styles from "./styles.module.css";
import { useContext } from "react";
import { ChatContext } from "../../shared/contexts/ChatProvider";
import HomeChatBoxLayout from "../HomeChatBoxLayout";

const Chat = () => {
  const { ActualChat } = useContext(ChatContext);

  return (
    <div className={styles.chatContainer}>
      {ActualChat == null ? (
        <HomeChatBoxLayout />
      ) : (
        <>
          <span className={styles.chatHeader}>
            <p>Débora Piannezer</p>
          </span>
          <div className={styles.chatBody}></div>
          <div className={styles.chatFooter}>
            <motion.div className={styles.inputTextContainer}>
              <label className={styles.inputTextBackground}>
                <input type="text" placeholder="   Type your message here..." />
                <button>
                  <IoMdSend fill="#FFF" />
                </button>
              </label>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
