import { IMessage } from "./Message";
import { IUser } from "./User";

export interface IChatInfo {
  id: number;
  uniqueIdentifier: string;
  title: string;
  messages: IMessage[];
  users: IUser[];
}
