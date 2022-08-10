/** @format */

import { IoMdSend } from "react-icons/io";
import { motion } from "framer-motion";
import styles from "./styles.module.css";
import React, { memo, useContext, useState } from "react";
import HomeChatBoxLayout from "../HomeChatBoxLayout";
import Message from "../Message";
import { AuthContext } from "../../shared/contexts/AuthProvider";
import { ChatContext } from "../../shared/contexts/ChatProvider";
import { sendMessage } from "@microsoft/signalr/dist/esm/Utils";

const Chat = () => {
  const [inFocus, setInFocus] = useState<boolean>(false);
  const [messageText, setMessageText] = useState<string>("");
  const { ActualChat, SendMessage } = useContext(ChatContext);
  const { User } = useContext(AuthContext);

  return (
    <div className={styles.chatContainer}>
      {ActualChat == null ? (
        <HomeChatBoxLayout />
      ) : (
        <>
          <motion.span
            key={ActualChat.title}
            initial={{
              opacity: 0,
              y: -15,
            }}
            animate={{
              opacity: 1,
              y: 0,
              boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            }}
            transition={{
              type: "spring",
              bounce: 0.5,
            }}
            className={styles.chatHeader}
          >
            <p>{ActualChat.title}</p>
          </motion.span>
          <motion.div className={styles.chatBody}>
            {ActualChat.messages != null &&
              ActualChat.messages?.length > 0 &&
              React.Children.toArray(
                ActualChat.messages.map((m, i) => {
                  return (
                    <motion.div
                      initial={{
                        x: m.id == User.id ? -25 : 25,
                        opacity: 0,
                      }}
                      animate={{
                        x: 0,
                        opacity: 1,
                      }}
                      transition={{
                        delay: i * 0.03,
                      }}
                      style={{
                        display: "flex",
                        flexFlow: "column nowrap",
                        width: "100%",
                      }}
                    >
                      <Message message={m} sendedByMe={m.userId == User.id} />
                    </motion.div>
                  );
                })
              )}
          </motion.div>
          <div className={styles.chatFooter}>
            <motion.div
              initial={{ opacity: 0, scaleY: 0.8 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ type: "spring", duration: 0.2, bounce: 0.2 }}
              className={styles.inputTextContainer}
            >
              <motion.label
                initial={{
                  opacity: 0,
                }}
                animate={
                  !inFocus
                    ? {
                        opacity: 1,
                        scaleX: 1,
                      }
                    : {
                        opacity: 1,
                        boxShadow: "inset 0 0 2px 2px rgba(0, 255, 115, 1)",
                      }
                }
                transition={{ type: "spring", bounce: 0.5 }}
                className={styles.inputTextBackground}
              >
                <input
                  autoFocus
                  onFocus={() => setInFocus(true)}
                  onBlur={() => setInFocus(false)}
                  type="text"
                  placeholder="   Type your message here..."
                  onChange={(e) => setMessageText(e.target.value)}
                  value={messageText}
                  onKeyDown={async (e) => {
                    if (e.key == "Enter") {
                      const sended = await SendMessage(messageText);

                      if (sended) {
                        setMessageText("");
                      }
                    }
                  }}
                />
                <button
                  onClick={async () => {
                    if (messageText.length <= 0) return;

                    const sended = await SendMessage(messageText);

                    if (sended) {
                      setMessageText("");
                    }
                  }}
                >
                  <IoMdSend fill="#FFF" />
                </button>
              </motion.label>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(Chat);
