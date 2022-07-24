import { IoMdSend } from "react-icons/io";
import { motion } from "framer-motion";

import styles from "./styles.module.css";

const Chat = () => {
  return (
    <div className={styles.chatContainer}>
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
    </div>
  );
};

export default Chat;
