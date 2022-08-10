/** @format */

import { ClassNames } from "@emotion/react";
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
  SendMessage: (textMessage: string) => Promise<boolean>;
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
      GetAllChats(User.id);
      GetAllContacts();
      JoinChatHub();
    }
  }, [User]);

  useEffect(() => {
    if (actualChat != null) {
      setActualChat(chats.find((p) => p.id == actualChat?.id)!);
    }
  }, [chats]);

  useEffect(() => {
    console.log(connection?.connectionId);

    connection?.on("JoinedServer", () => {
      console.log("CONECTANDO", connection.connectionId);
    });

    connection?.on("MessageReceived", (message: IMessage) => {
      console.log(message.id);
      PushNewMessage(message);
    });

    connection?.onreconnected(() => {
      connection.invoke("ReconnectedServerHub", User);
    });
  }, [connection]);

  const JoinChatHub = async () => {
    const con = new HubConnectionBuilder()
      .withUrl(`${process.env.BASEURL_API}/chat`)
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

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

  const PushNewMessage = (message: IMessage) => {
    const newChats = chats.filter((c) => c.id != message.chatId);
    const chatToModify = chats.find((c) => c.id == message.chatId);

    console.log(chatToModify);

    if (chatToModify != null) {
      if (chatToModify.messages == null) {
        chatToModify.messages = new Array<IMessage>();
      }

      console.log(chatToModify);

      chatToModify.messages.push(message);
      newChats.push(chatToModify);

      setChats(newChats);
    }
  };

  async function GetAllContacts() {
    const contacts = await ChatService.GetAllContacts();
    if (contacts != null) setContacts(contacts.filter((c) => c.id != User.id));
  }

  async function GetAllChats(userId: number) {
    const newChats = await ChatService.GetAllChatsByUserId(userId);

    if (newChats != null) {
      setChats(newChats);
    }
  }

  async function SendMessage(textMessage: string): Promise<boolean> {
    const success = await ChatService.SendMessage(
      User.id,
      actualChat!.id,
      textMessage
    );

    return success;
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
        SendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
});
