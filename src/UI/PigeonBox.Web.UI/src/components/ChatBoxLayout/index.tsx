/** @format */
import React, { memo, useContext, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsFillChatLeftDotsFill } from "react-icons/bs";
import { HiDotsHorizontal } from "react-icons/hi";
import Chat from "../Chat";
import styles from "./styles.module.css";
import { motion } from "framer-motion";
import { ChatContext } from "../../shared/contexts/ChatProvider";
import { AuthContext } from "../../shared/contexts/AuthProvider";
import { IChatInfo } from "../../shared/models/Chat";
import { IUser } from "../../shared/models/User";

const ChatBox = () => {
  const [tabActive, setTabActive] = useState<"chats" | "contacts">("chats");
  const { Chats, Contacts } = useContext(ChatContext);
  const { User } = useContext(AuthContext);

  return (
    <motion.div
      initial={{ y: 250, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", duration: 1, bounce: 0.4 }}
      className={styles.chatBoxFlexContainer}
    >
      <div className={styles.chatBoxContainer}>
        <div className={styles.chatBoxHeader}>
          <span>
            <h3>{User?.name}</h3>
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
            <div className={styles.lateralMenuitemPanel}>
              {tabActive == "chats" ? (
                <ChatsPanel Chats={Chats} />
              ) : (
                <ContactsPanel Contacts={Contacts} />
              )}
            </div>
          </div>
          <Chat />
        </div>
      </div>
    </motion.div>
  );
};

const ContactsPanel = ({ Contacts }: { Contacts: IUser[] }) => {
  return (
    <>
      {React.Children.toArray(
        Contacts.map((c) => {
          return (
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0 }}
              className={styles.lateralMenuItemContainer}
            >
              <div className={styles.lateralMenuItemName}>
                <div className={styles.statusConnectedCircleContainer}>
                  {c.isOnline && (
                    <div className={styles.statusConnectedCircle} />
                  )}
                </div>
                <p>{c.name}</p>
              </div>
              <span>
                <HiDotsHorizontal />
              </span>
            </motion.div>
          );
        })
      )}
    </>
  );
};

const ChatsPanel = ({ Chats }: { Chats: IChatInfo[] }) => {
  return (
    <>
      {React.Children.toArray(
        Chats.map((c) => {
          return (
            <>
              <motion.div
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0 }}
                className={styles.lateralMenuItemContainer}
              >
                <div className={styles.lateralMenuItemName}>
                  <div className={styles.statusConnectedCircleContainer}></div>
                  <p>{c.Title}</p>
                </div>
                <span>
                  <BsFillChatLeftDotsFill />
                </span>
              </motion.div>
            </>
          );
        })
      )}
    </>
  );
};

export default memo(ChatBox);
