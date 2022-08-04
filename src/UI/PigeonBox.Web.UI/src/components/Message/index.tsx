import styles from "./styles.module.css";
import { IMessage } from "../../shared/models/Message";
import { motion } from "framer-motion";

const Message = (message: IMessage) => {
  return (
    <motion.div
      initial={{
        scale: 0.9,
        filter: "brightness(1)",
      }}
      animate={{
        scale: 1,
      }}
      transition={{
        type: "spring",
        duration: 1,
        bounce: 0.4,
      }}
      whileHover={{
        scale: 1.03,
        filter: "brightness(1.2)",
        transition: {
          type: "spring",
          duration: 0.3,
        },
      }}
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
    </motion.div>
  );
};

export default Message;
