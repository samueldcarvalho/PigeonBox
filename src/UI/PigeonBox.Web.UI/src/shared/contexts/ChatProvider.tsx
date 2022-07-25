/** @format */

import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { createContext, ReactElement, useState } from "react";
import { IChatInfo, IContact, IUser } from "../../components/ChatBoxLayout";

interface IChatContextProps {
  User: IUser | null;
  Contacts: IContact[];
  Chats: IChatInfo[];
  ActualChat: IChatInfo | null;
  JoinChatHub: () => void;
}

export const ChatContext = createContext({} as IChatContextProps);

export const ChatProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState<IUser | null>({
    Name: "Samuel de Carvalho",
  });
  const [contacts, setContacts] = useState<IContact[]>([
    { Id: 1, Name: "PigeonBox Bot", IsOnline: true },
  ]);
  const [chats, setChats] = useState<IChatInfo[]>([
    {
      Identifier: "1",
      Messages: [],
      Participants: [],
      Title: "Welcome to PigeonBox!",
    },
  ]);
  const [actualChat, setActualChat] = useState<IChatInfo | null>(null);
  const [connection, setConnection] = useState<HubConnection>();

  const JoinChatHub = async () => {
    const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:5001/chat")
      .configureLogging(LogLevel.Information)
      .build();

    connection.on("JoinedServer", (user: string, message: string) => {
      console.log(message);
    });

    await connection.start();
    await connection.invoke("JoinServerHub");
  };

  return (
    <ChatContext.Provider
      value={{
        User: user,
        Contacts: contacts,
        Chats: chats,
        ActualChat: actualChat,
        JoinChatHub,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
