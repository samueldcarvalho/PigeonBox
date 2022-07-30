export interface IMessage {
  Id: string;
  SendedByMe: boolean;
  UserId: number;
  SendedAt: Date;
  Text: string;
}
