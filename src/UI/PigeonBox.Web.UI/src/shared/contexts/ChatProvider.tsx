/** @format */

import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import {
  createContext,
  memo,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { IChatInfo } from "../models/Chat";
import { IMessage } from "../models/Message";
import { IUser } from "../models/User";
import { ChatService } from "../services/ChatService";
import { AuthContext } from "./AuthProvider";

interface IChatContextProps {
  Contacts: IUser[];
  Chats: IChatInfo[];
  ActualChat: IChatInfo | null;
  SetActualChat: (chat: IChatInfo) => void;
  JoinChatHub: () => void;
  GetAllChats: (userId: number) => void;
  GetAllContacts: () => void;
}

export const ChatContext = createContext({} as IChatContextProps);

export const ChatProvider = memo(({ children }: { children: ReactElement }) => {
  const [contacts, setContacts] = useState<IUser[]>([]);
  const [chats, setChats] = useState<IChatInfo[]>([]);
  const [actualChat, setActualChat] = useState<IChatInfo | null>(null);
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const { User } = useContext(AuthContext);

  useEffect(() => {
    if (User != null && connection == null) {
      JoinChatHub();
    }
  }, [User]);

  useEffect(() => {
    if (actualChat != null) {
      console.log("Alterado!");
      setActualChat(chats.find((p) => p.id == actualChat?.id)!);
    }
  }, [chats]);

  const JoinChatHub = async () => {
    const con = new HubConnectionBuilder()
      .withUrl(`${process.env.BASEURL_API}/chat`)
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    con.on("JoinedServer", (userId: number) => {
      console.log("CONECTANDO", userId);
    });

    con.on("MessageReceived", (message: IMessage) => {
      console.log(message);

      const newChats = chats.filter((p) => p.id != message.chatId);
      const chatToModify = chats.find((p) => p.id == message.chatId);

      if (chatToModify == null) return;

      chatToModify.messages.push(message);
      newChats.push(chatToModify!);

      setChats(...newChats);
    });

    // con.on(
    //   "MessageReceived",
    //   (chatId: string, contactId: number, message: string) => {
    //     const chat = chats.find((c) => c.Identifier == chatId);

    //     // if (chat != null) {
    //     //   chat.Messages.push({
    //     //     Id: crypto.randomUUID(),
    //     //     SendedByMe: false,
    //     //     Text: message,
    //     //     SendedAt: new Date(),
    //     //     UserId: contactId,
    //     //   });

    //       // setChats([
    //       //   chat,
    //       //   ...chats.filter((c) => c.Identifier != chat.Identifier),
    //       // ]);
    //     }
    //   }
    // );

    await con.start();
    await con.invoke("JoinServerHub", User);

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

  async function GetAllContacts() {
    const contacts = await ChatService.GetAllContacts();
    if (contacts != null) setContacts(contacts.filter((c) => c.id != User.id));
  }

  async function GetAllChats(userId: number) {
    const chats = await ChatService.GetAllChatsByUserId(userId);
    if (chats != null) setChats(chats);
  }

  return (
    <ChatContext.Provider
      value={{
        Contacts: contacts,
        Chats: chats,
        ActualChat: actualChat,
        JoinChatHub,
        SetActualChat,
        GetAllChats,
        GetAllContacts,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
});
