/** @format */

import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { TryTwoTone } from "@mui/icons-material";
import {
  createContext,
  memo,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { isKeyObject } from "util/types";
import { IChatInfo } from "../models/Chat";
import { IContact } from "../models/Contact";
import { IUser } from "../models/User";
import { AuthContext } from "./AuthProvider";

interface IChatContextProps {
  Contacts: IUser[];
  Chats: IChatInfo[];
  ActualChat: IChatInfo | null;
  SetActualChat: (chat: IChatInfo) => void;
  JoinChatHub: () => void;
}

export const ChatContext = createContext({} as IChatContextProps);

export const ChatProvider = memo(({ children }: { children: ReactElement }) => {
  const [contacts, setContacts] = useState<IUser[]>([
    {
      id: -1,
      email: "bot@pigeonbox.com.br",
      isOnline: true,
      name: "PigeonBot",
      username: "pigeonBotuuix132400-xx#",
    },
  ]);
  const [chats, setChats] = useState<IChatInfo[]>([
    {
      Identifier: "A123HelloWorld",
      Messages: [],
      Participants: [],
      Title: "Welcome to PigeonBox!",
    },
    {
      Identifier: "1",
      Messages: [],
      Participants: [],
      Title: "Jorge Mattaza",
    },
    {
      Identifier: "2",
      Messages: [],
      Participants: [],
      Title: "Débora Pianezzer",
    },
    {
      Identifier: "3",
      Messages: [],
      Participants: [],
      Title: "Chat Teste",
    },
  ]);
  const [actualChat, setActualChat] = useState<IChatInfo | null>(null);
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const { User } = useContext(AuthContext);

  useEffect(() => {
    if (User != null && connection == null) {
      JoinChatHub();
    }
  }, [User]);

  const JoinChatHub = async () => {
    const con = new HubConnectionBuilder()
      .withUrl(`${process.env.BASEURL_API}/chat`)
      .configureLogging(LogLevel.Information)
      .build();

    console.log("Executada");

    con.on("JoinedServer", (userId: number) => {
      console.log("CONECTANDO", userId);
    });

    con.on(
      "MessageReceived",
      (chatId: string, contactId: number, message: string) => {
        console.log(chatId, contactId, message);
      }
    );

    await con.start();
    await con.invoke("JoinServerHub", User?.id);

    setConnection(con);
  };

  function SetActualChat(chat: IChatInfo) {
    if (chat == actualChat) {
      setActualChat(null);
      return;
    }

    const chatExists = chats.includes(chat);

    if (chatExists) {
      setActualChat(chat);
    } else {
      setChats([chat, ...chats]);
      setActualChat(chat);
    }
  }

  return (
    <ChatContext.Provider
      value={{
        Contacts: contacts,
        Chats: chats,
        ActualChat: actualChat,
        JoinChatHub,
        SetActualChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
});
