/** @format */

import styles from "./styles.module.css";
import { motion } from "framer-motion";

const HomeChatBoxLayout = () => {
  return (
    <div className={styles.layoutContainer}>
      <motion.div>
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
