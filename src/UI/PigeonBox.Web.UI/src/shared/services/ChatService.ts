import { IChatInfo } from "../models/Chat";
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
    .catch(() => {
      return null;
    });
}

export const ChatService = {
  GetAllChatsByUserId,
};
