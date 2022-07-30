/** @format */

import styles from "./styles.module.css";
import { motion } from "framer-motion";

const HomeChatBoxLayout = () => {
  return (
    <div className={styles.layoutContainer}>
      <motion.div
        initial={{
          y: 15,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          type: "spring",
          bounce: 0.5,
        }}
      >
        <h1>Get's started!</h1>
        <p>
          <strong>Select</strong> a chat or a contact{" "}
          <strong>on Lateral Menu</strong> to send messages
        </p>
      </motion.div>
    </div>
  );
};

export default HomeChatBoxLayout;
