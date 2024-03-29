import { randomUUID } from "crypto";
import { IChatInfo } from "../models/Chat";
import { IUser } from "../models/User";
import { Api } from "./Api";
import { v4 } from "uuid";
import { HubConnection } from "@microsoft/signalr";

let connection: HubConnection;

async function GetAllChatsByUserId(): Promise<IChatInfo[] | null> {
  return await Api.get("/chat/get")
    .then((res) => res.data as IChatInfo[])
    .catch(() => null);
}

async function SendMessage(
  userId: number,
  chatId: number,
  text: string
): Promise<boolean> {
  const sendMessageInput = {
    uniqueIdentifier: v4(),
    userId,
    chatId,
    text,
  };
  return await Api.post("/chat/message/send", sendMessageInput)
    .then(() => true)
    .catch(() => false);
}

async function GetAllContacts(): Promise<IUser[] | null> {
  return await Api.get("/user/contacts")
    .then((res) => res.data as IUser[])
    .catch(() => null);
}

export const ChatService = {
  GetAllChatsByUserId,
  GetAllContacts,
  SendMessage,
  connection: connection!
};
