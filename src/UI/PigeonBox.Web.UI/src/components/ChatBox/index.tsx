/** @format */
import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsFillChatLeftDotsFill } from "react-icons/bs";
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
                className={`${styles.tabButton} ${styles.left} ${
                  tabActive == "chats" ? styles.activeTabButton : ""
                }`}
                onClick={() => setTabActive("chats")}
              >
                Chats
              </button>
              <button
                className={`${styles.tabButton} ${styles.right} ${
                  tabActive == "contacts" ? styles.activeTabButton : ""
                }`}
                onClick={() => setTabActive("contacts")}
              >
                Contacts
              </button>
            </div>
            <div className={styles.search}>
              <label>
                <input type="text" placeholder="search anything..." />
                <button>
                  <BiSearchAlt2 fill="#FFF" />
                </button>
              </label>
            </div>
            <div>
              {tabActive == "chats" ? <ChatsPanel /> : <ContactsPanel />}
            </div>
          </div>
          <div className={styles.chatBoxBodyChatContainer}></div>
        </div>
      </div>
    </div>
  );
};

const ContactsPanel = () => {
  return (
    <div>
      <div className={styles.lateralMenuItemContainer}>
        <p>Samuel de Carvalho</p>
        <span>
          <BsFillChatLeftDotsFill />
        </span>
      </div>
      <div className={styles.lateralMenuItemContainer}>
        <p>Débora Pianezzer</p>
        <span>
          <BsFillChatLeftDotsFill />
        </span>
      </div>
      <div className={styles.lateralMenuItemContainer}>
        <p>Ailton Lopes</p>
        <span>
          <BsFillChatLeftDotsFill />
        </span>
      </div>
    </div>
  );
};

const ChatsPanel = () => {
  return <></>;
};

export default ChatBox;
