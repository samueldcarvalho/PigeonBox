import Link from "next/link";
import styles from "./styles.module.css";
import { motion } from "framer-motion";

const LoginForm = () => {
  return (
    <div className={styles.formContainer}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className={styles.form}
      >
        <motion.div
          initial={{ marginBottom: 100, height: 400, opacity: 0 }}
          animate={{ marginBottom: 0, height: 350, opacity: 1 }}
          transition={{ type: "spring", duration: 1, bounce: 0.6 }}
          className={styles.formConduce}
        >
          <span className={styles.formHeader}>
            <h1>Sign in with</h1>
          </span>
          <div className={styles.formBody}>
            <label className={styles.formInputTextLabel}>
              <input type="text" placeholder="Your username..." />
            </label>
            <label className={styles.formInputTextLabel}>
              <input type="password" placeholder="Your password..." />
            </label>
          </div>
          <div className={styles.formFooter}>
            <button className={styles.buttonAction}>Sign in</button>
            <span>
              <p>First time in our rocket?&nbsp;</p>
              <Link href="/signup">
                <p className={styles.hrefAction}>Sign-up!</p>
              </Link>
            </span>
          </div>
        </motion.div>
      </form>
    </div>
  );
};

export default LoginForm;
