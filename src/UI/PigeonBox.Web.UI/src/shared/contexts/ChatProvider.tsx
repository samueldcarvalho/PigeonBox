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
  useState,
} from "react";
import { IChatInfo } from "../models/Chat";
import { IContact } from "../models/Contact";
import { IUser } from "../models/User";
import { AuthContext } from "./AuthProvider";

interface IChatContextProps {
  Contacts: IUser[];
  Chats: IChatInfo[];
  ActualChat: IChatInfo | null;
  JoinChatHub: () => Promise<boolean>;
}

export const ChatContext = createContext({} as IChatContextProps);

export const ChatProvider = memo(({ children }: { children: ReactElement }) => {
  const [contacts, setContacts] = useState<IUser[]>([]);
  const [chats, setChats] = useState<IChatInfo[]>([
    {
      Identifier: "1",
      Messages: [],
      Participants: [],
      Title: "Welcome to PigeonBox!",
    },
  ]);
  const [actualChat, setActualChat] = useState<IChatInfo | null>(null);
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const { User } = useContext(AuthContext);

  const JoinChatHub = async (): Promise<boolean> => {
    const con = new HubConnectionBuilder()
      .withUrl(`${process.env.BASEURL_API}/chat`)
      .configureLogging(LogLevel.Information)
      .build();

    con.on("JoinedServer", (user: string) => {
      console.log("CONECTANDO", user);
      const userContact = JSON.parse(user) as IUser;
      userContact.isOnline = true;
      setContacts([...contacts, userContact]);
    });
    try {
      await con.start();
      await con.invoke(
        "JoinServerHub",
        JSON.stringify(() => {
          User.isOnline = true;
          return User;
        })
      );
      setConnection(con);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <ChatContext.Provider
      value={{
        Contacts: contacts,
        Chats: chats,
        ActualChat: actualChat,
        JoinChatHub,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
});
