/** @format */

import { IoMdSend } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";

import styles from "./styles.module.css";
import { memo, useContext } from "react";
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
          <motion.span
            key={ActualChat.Title}
            initial={{
              opacity: 0,
              y: -45,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              type: "spring",
              bounce: 0.5,
            }}
            className={styles.chatHeader}
          >
            <p>{ActualChat.Title}</p>
          </motion.span>
          <div className={styles.chatBody}></div>
          <div className={styles.chatFooter}>
            <AnimatePresence>
              <motion.div
                initial={{
                  y: 35,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  type: "spring",
                  bounce: 0.5,
                }}
                exit={{
                  y: 35,
                  opacity: 0,
                }}
                className={styles.inputTextContainer}
              >
                <label className={styles.inputTextBackground}>
                  <input
                    type="text"
                    placeholder="   Type your message here..."
                  />
                  <button>
                    <IoMdSend fill="#FFF" />
                  </button>
                </label>
              </motion.div>
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(Chat);
