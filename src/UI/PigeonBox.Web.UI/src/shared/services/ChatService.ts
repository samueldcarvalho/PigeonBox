import { IChatInfo } from "../models/Chat";
import { IUser } from "../models/User";
import { Api } from "./Api";

async function GetAllChatsByUserId(
  userId: number
): Promise<IChatInfo[] | null> {
  return await Api.get("/chat/get", {
    params: {
      userId: userId,
    },
  })
    .then((res) => res.data as IChatInfo[])
    .catch(() => null);
}

async function GetAllContacts(): Promise<IUser[] | null> {
  return await Api.get("/contacts/get/all")
    .then((res) => res.data as IUser[])
    .catch(() => null);
}

export const ChatService = {
  GetAllChatsByUserId,
  GetAllContacts,
};
