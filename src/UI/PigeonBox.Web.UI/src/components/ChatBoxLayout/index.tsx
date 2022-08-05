/** @format */
import React, { memo, useContext, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { FaSadTear } from "react-icons/fa";
import { BsFillChatLeftDotsFill, BsPeopleFill } from "react-icons/bs";
import { HiDotsHorizontal } from "react-icons/hi";
import Chat from "../Chat";
import styles from "./styles.module.css";
import { motion } from "framer-motion";
import { ChatContext } from "../../shared/contexts/ChatProvider";
import { AuthContext } from "../../shared/contexts/AuthProvider";
import { IChatInfo } from "../../shared/models/Chat";
import { IUser } from "../../shared/models/User";
import { duration } from "@mui/material";

const ChatBox = () => {
  const [tabActive, setTabActive] = useState<"chats" | "contacts">("chats");
  const { Chats, Contacts } = useContext(ChatContext);
  const { User } = useContext(AuthContext);

  return (
    <motion.div className={styles.chatBoxFlexContainer}>
      <motion.div
        initial={{
          y: 150,
          scale: 0.9,
          width: "360px",
          opacity: 0,
          borderRadius: 240,
          filter: "",
        }}
        animate={{
          scale: 1,
          y: 0,
          width: "100%",
          opacity: 1,
          borderRadius: 24,
        }}
        transition={{
          duration: 1.5,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        style={{
          overflow: "hidden",
        }}
        className={styles.chatBoxContainer}
      >
        <div className={styles.chatBoxHeader}>
          <span>
            <h1>{User?.name}</h1>
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
      </motion.div>
    </motion.div>
  );
};

const ContactsPanel = ({ Contacts }: { Contacts: IUser[] }) => {
  return (
    <>
      {Contacts.length > 0 ? (
        React.Children.toArray(
          Contacts.map((c, i) => {
            return (
              <motion.button
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  type: "spring",
                  duration: 0.5,
                  bounce: 0,
                  delay: i * 0.1,
                }}
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
              </motion.button>
            );
          })
        )
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -25 }}
          transition={{ type: "spring", duration: 0.6, bounce: 0.4 }}
          className={styles.notFoundMessage}
        >
          <strong>No contact found on server</strong>
          <BsPeopleFill />
        </motion.div>
      )}
    </>
  );
};

const ChatsPanel = ({ Chats }: { Chats: IChatInfo[] }) => {
  const { ActualChat, SetActualChat } = useContext(ChatContext);

  return (
    <>
      {Chats.length > 0 ? (
        React.Children.toArray(
          Chats.map((c, i) => {
            return (
              <>
                <motion.button
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    type: "spring",
                    duration: 0.5,
                    bounce: 0,
                    delay: i * 0.1,
                  }}
                  className={`${styles.lateralMenuItemContainer} ${
                    ActualChat?.uniqueIdentifier == c.uniqueIdentifier &&
                    styles.lateralMenuItemSelected
                  }`}
                  onClick={() => SetActualChat(c)}
                >
                  <div className={styles.lateralMenuItemName}>
                    <div
                      className={styles.statusConnectedCircleContainer}
                    ></div>
                    <p>{c.title}</p>
                  </div>
                  <span>
                    <BsFillChatLeftDotsFill />
                  </span>
                </motion.button>
              </>
            );
          })
        )
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -25 }}
          transition={{ type: "spring", duration: 0.6, bounce: 0.4 }}
          className={styles.notFoundMessage}
        >
          <strong>No chat was found</strong>
          <FaSadTear />
        </motion.div>
      )}
    </>
  );
};

export default memo(ChatBox);
