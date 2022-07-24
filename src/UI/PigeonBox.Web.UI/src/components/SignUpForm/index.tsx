import Link from "next/link";
import styles from "./styles.module.css";

const SignUpForm = () => {
  return (
    <div className={styles.formContainer}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className={styles.form}
      >
        <span className={styles.formHeader}>
          <h1>Create new Account</h1>
        </span>
        <div className={styles.formBody}>
          <label className={styles.formInputTextLabel}>
            <input type="text" placeholder="Your username..." />
          </label>
          <label className={styles.formInputTextLabel}>
            <input type="password" placeholder="Your password..." />
          </label>
          <label className={styles.formInputTextLabel}>
            <input type="password" placeholder="Your password..." />
          </label>
          <label className={styles.formInputTextLabel}>
            <input type="password" placeholder="Your password..." />
          </label>
        </div>
        <div className={styles.formFooter}>
          <button className={styles.buttonAction}>Sign up</button>
          <span>
            <p>Already have an account?&nbsp;</p>
            <Link href="/authentication">
              <p className={styles.hrefAction}>Sign In now!</p>
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
