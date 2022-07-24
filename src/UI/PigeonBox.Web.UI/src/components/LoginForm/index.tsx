import Link from "next/link";
import styles from "./styles.module.css";

const LoginForm = () => {
  return (
    <div className={styles.formContainer}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className={styles.form}
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
      </form>
    </div>
  );
};

export default LoginForm;
