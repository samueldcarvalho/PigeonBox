import styles from "./styles.module.css";
import { IMessage } from "../../shared/models/Message";
import { motion } from "framer-motion";

const Message = ({
  message,
  sendedByMe,
}: {
  message: IMessage;
  sendedByMe: boolean;
}) => {
  return (
    <motion.div
      whileHover={{
        filter: "brightness(1.2)",
        transition: {
          type: "spring",
          duration: 0.2,
        },
      }}
      className={`${styles.messageBackground} ${
        sendedByMe
          ? styles.messageBackgroundByMe
          : styles.messageBackgroundVisit
      }`}
    >
      <div className={styles.messageHeader}>
        <span>{message.userName}</span>
      </div>
      <div className={styles.messageBody}>
        <span className={styles.messageTime}>
          {new Date(message.sentAt).toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </span>
        <span className={styles.messageText}>{message.text}</span>
      </div>
    </motion.div>
  );
};

export default Message;
