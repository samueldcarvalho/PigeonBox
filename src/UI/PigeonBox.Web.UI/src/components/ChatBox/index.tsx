/** @format */

import ChatLateralMenuTabs from "../ChatLateralMenuTabs";
import styles from "./styles.module.css";

const ChatBox = () => {
  return (
    <div className={styles.chatBoxFlexContainer}>
      <div className={styles.chatBoxContainer}>
        <div className={styles.chatBoxHeader}>
          <span>
            <h2>Username</h2>
          </span>
        </div>
        <div className={styles.chatBoxBody}>
          <div className={styles.chatBoxBodyLateralMenu}>
            <ChatLateralMenuTabs />
          </div>
          <div className={styles.chatBoxBodyChatContainer}></div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
