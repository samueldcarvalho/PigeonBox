import styles from "./styles.module.css";
import { IMessage } from "../../shared/models/Message";

const Message = (message: IMessage) => {
  return (
    <div
      className={`${styles.messageBackground} ${
        message.SendedByMe
          ? styles.messageBackgroundByMe
          : styles.messageBackgroundVisit
      }`}
    >
      <div className={styles.messageHeader}>
        <span>{message.UserId}</span>
      </div>
      <div className={styles.messageBody}>
        <span className={styles.messageTime}>
          {message.SendedAt.toLocaleTimeString("pt-BR", { timeStyle: "short" })}
        </span>
        <span className={styles.messageText}>{message.Text}</span>
      </div>
    </div>
  );
};

export default Message;
