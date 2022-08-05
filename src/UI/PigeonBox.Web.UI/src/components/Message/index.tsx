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
      initial={{}}
      animate={{}}
      transition={{
        type: "spring",
        duration: 0.4,
        bounce: 0.4,
      }}
      whileHover={{
        scale: 1.02,
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
        <span>{message.userId}</span>
      </div>
      <div className={styles.messageBody}>
        <span className={styles.messageTime}>{message.sentAt.toString()}</span>
        <span className={styles.messageText}>{message.text}</span>
      </div>
    </motion.div>
  );
};

export default Message;
