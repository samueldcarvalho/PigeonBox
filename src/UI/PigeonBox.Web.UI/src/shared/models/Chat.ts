import { IContact } from "./Contact";
import { IMessage } from "./Message";
import { IUser } from "./User";

export interface IChatInfo {
  Identifier: string;
  Title: string;
  Messages: IMessage[];
  Users: IUser[];
}
