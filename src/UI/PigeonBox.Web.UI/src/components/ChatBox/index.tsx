/** @format */
import { useState } from "react";
import styles from "./styles.module.css";

const ChatBox = () => {
  const [tabActive, setTabActive] = useState<"chats" | "contacts">("chats");

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
            <div className={styles.lateralMenuTabButtons}>
              <button
                className={
                  tabActive == "chats"
                    ? styles.activeTabButton
                    : styles.tabButton
                }
                onClick={() => setTabActive("chats")}
              >
                Chats
              </button>
              <button
                className={
                  tabActive == "contacts"
                    ? styles.activeTabButton
                    : styles.tabButton
                }
                onClick={() => setTabActive("contacts")}
              >
                Contacts
              </button>
            </div>
            <div>
              {tabActive == "chats" ? <ContactsPanel /> : <ChatsPanel />}
            </div>
          </div>
          <div className={styles.chatBoxBodyChatContainer}></div>
        </div>
      </div>
    </div>
  );
};

const ContactsPanel = () => {
  return <>Contacts</>;
};

const ChatsPanel = () => {
  return <>Chats</>;
};

export default ChatBox;
