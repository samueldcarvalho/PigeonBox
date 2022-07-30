/** @format */

import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { TryTwoTone } from "@mui/icons-material";
import { randomUUID } from "crypto";
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
import { IMessage } from "../models/Message";
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
      Messages: [
        {
          Id: "1",
          SendedAt: new Date(),
          SendedByMe: false,
          Text: "Envio Visitante",
          UserId: -1,
        },
        {
          Id: "2",
          SendedAt: new Date(),
          SendedByMe: true,
          Text: "Envio Meu mesmo",
          UserId: 10,
        },
      ],
      Participants: [],
      Title: "#Everyone",
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
      .withAutomaticReconnect()
      .build();

    con.on("JoinedServer", (userId: number) => {
      console.log("CONECTANDO", userId);
    });

    con.on(
      "MessageReceived",
      (chatId: string, contactId: number, message: string) => {
        const chat = chats.find((c) => c.Identifier == chatId);

        console.log(chat);

        if (chat != null) {
          chat.Messages.push({
            Id: crypto.randomUUID(),
            SendedByMe: false,
            Text: message,
            SendedAt: new Date(),
            UserId: contactId,
          });

          setChats([
            chat,
            ...chats.filter((c) => c.Identifier != chat.Identifier),
          ]);
        }
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
