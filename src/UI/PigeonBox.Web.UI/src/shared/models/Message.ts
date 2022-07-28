export interface IMessage {
  Id: string;
  SendedByMe: boolean;
  SendedBy: string;
  SendedAt: Date;
  Text: string;
}
