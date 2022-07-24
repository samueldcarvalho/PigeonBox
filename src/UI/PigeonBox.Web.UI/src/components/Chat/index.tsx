import { IoMdSend } from "react-icons/io";
import { IChatInfo } from "../ChatBoxLayout";
import styles from "./styles.module.css";

const Chat = () => {
  return (
    <div className={styles.chatContainer}>
      <span className={styles.chatHeader}>
        <p>Débora Piannezer</p>
      </span>
      <div className={styles.chatBody}></div>
      <div className={styles.chatFooter}>
        <div className={styles.inputTextContainer}>
          <label className={styles.inputTextBackground}>
            <input type="text" placeholder="   Type your message here..." />
            <button>
              <IoMdSend fill="#FFF" />
            </button>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Chat;
