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
import { AuthContext, AuthProvider } from "./AuthProvider";
import { CookiesService } from "../services/CookiesService";
import { UserService } from "../services/UserService";

interface IChatContextProps {
  Contacts: IUser[];
  Chats: IChatInfo[];
  ActualChat: IChatInfo | null;
  SetActualChat: (chat: IChatInfo) => void;
  JoinChatHub: () => void;
  StopChatHub: () => void;
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
      GetAllContacts();
      GetAllChats();
      JoinChatHub();
    }
  }, [User]);

  useEffect(() => {
    if (actualChat != null) {
      setActualChat(chats.find((p) => p.id == actualChat?.id)!);
    }
  }, [chats]);

  useEffect(() => {
    connection?.on("JoinedServer", async (userId: number) => {
      let contactJoined = contacts.find((p) => p.id == userId);

      if(contactJoined == null){
          await GetAllContacts();
          contactJoined = contacts.find((p) => p.id == userId);
      }

      if (contactJoined == null) {
        return;
      } 

      contactJoined.isOnline = true;

      setContacts([contactJoined, ...contacts.filter(x => x.id != contactJoined!.id)]);
    });

    connection?.on("DisconnectedServer", (userId: number) => {
      const contactDisconnected = contacts.find((p) => p.id == userId);

      if(contactDisconnected == null)
        return;

      contactDisconnected.isOnline = false;

      setContacts(contacts);
    });

    connection?.on("MessageReceived", (message: IMessage) => {
      PushNewMessage(message);
    });
  }, [connection]);

  const JoinChatHub = async () => {
    if(CookiesService.GetUserTokenCookie() == null){
      console.log("Não autenticado")
      return;
    }
    
    const con = new HubConnectionBuilder()
      .withUrl(`${process.env.BASEURL_API}chat`, {
        accessTokenFactory: () => CookiesService.GetUserTokenCookie()
      })
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    await con.start();

    ChatService.connection = con;

    setConnection(con);
  };

  const StopChatHub = () => {
    if(connection == null)
      return;

    connection.stop();
  }

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

    if (chatToModify != null) {
      if (chatToModify.messages == null) {
        chatToModify.messages = new Array<IMessage>();
      }

      chatToModify.messages.push(message);
      newChats.push(chatToModify);

      setChats(newChats);
    }
  };

  async function GetAllContacts() {
    const contacts = await ChatService.GetAllContacts();
    if (contacts != null) {
      setContacts(contacts);
    }
  }

  async function GetAllChats() {
    const newChats = await ChatService.GetAllChatsByUserId();

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
        StopChatHub
      }}
    >
      {children}
    </ChatContext.Provider>
  );
});
