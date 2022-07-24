/** @format */
import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsFillChatLeftDotsFill } from "react-icons/bs";
import styles from "./styles.module.css";

export interface IContact {
  Id: number;
  Name: string;
  IsOnline: boolean;
}

const Contacts: IContact[] = [
  { Id: 1, Name: "Débora Pianezzer", IsOnline: true },
  { Id: 2, Name: "Renata Figueira", IsOnline: true },
  { Id: 3, Name: "Ailton Marques F.", IsOnline: false },
  { Id: 4, Name: "Charles Carvalho", IsOnline: true },
];

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
      {Contacts.map((c, i) => {
        return (
          <div key={i} className={styles.lateralMenuItemContainer}>
            <div className={styles.lateralMenuItemName}>
              <div className={styles.statusConnectedCircleContainer}>
                {c.IsOnline && <div className={styles.statusConnectedCircle} />}
              </div>
              <p>{c.Name}</p>
            </div>
            <span>
              <BsFillChatLeftDotsFill />
            </span>
          </div>
        );
      })}
    </div>
  );
};

const ChatsPanel = () => {
  return <></>;
};

export default ChatBox;
