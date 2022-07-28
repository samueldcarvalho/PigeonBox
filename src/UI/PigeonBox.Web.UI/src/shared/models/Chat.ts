import { IContact } from "./Contact";
import { IMessage } from "./Message";

export interface IChatInfo {
  Identifier: string;
  Title: string;
  Messages: IMessage[];
  Participants: IContact[];
}
