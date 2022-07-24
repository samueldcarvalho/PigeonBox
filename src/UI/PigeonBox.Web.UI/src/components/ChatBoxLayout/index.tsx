/** @format */
import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsFillChatLeftDotsFill } from "react-icons/bs";
import Chat from "../Chat";
import styles from "./styles.module.css";

export interface IContact {
  Id: number;
  Name: string;
  IsOnline: boolean;
}

export interface IChatInfo {
  Title: string;
}

export interface IUser {
  Id: number;
  Name: string;
}

const User: IUser = {
  Id: 1,
  Name: "Samuel de Carvalho",
};

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
            <h3>{User.Name}</h3>
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
                <input type="text" placeholder="Search chats or contacts..." />
                <button>
                  <BiSearchAlt2 fill="#FFF" />
                </button>
              </label>
            </div>
            <div>
              {tabActive == "chats" ? <ChatsPanel /> : <ContactsPanel />}
            </div>
          </div>
          <Chat />
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
