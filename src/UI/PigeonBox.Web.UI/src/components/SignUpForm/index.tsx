import Link from "next/link";
import styles from "./styles.module.css";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className={styles.formContainer}>
      <form
        onSubmit={handleSubmit((data) => console.log(data))}
        autoComplete="off"
        className={styles.form}
      >
        <motion.div
          initial={{ height: 400, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
          className={styles.formConduce}
        >
          <span className={styles.formHeader}>
            <h1>Create new Account</h1>
          </span>
          <div className={styles.formBody}>
            <div className={styles.formInputSideBySide}>
              <label
                className={`${styles.formInputTextLabel} formInputTextLabel formInputTextLabelError`}
              >
                <input
                  {...register("firstName", { required: true, minLength: 4 })}
                  type="text"
                  autoComplete="false"
                  name="hidden"
                  placeholder="First name..."
                />
              </label>
              <label
                className={styles.formInputTextLabel + " formInputTextLabel"}
              >
                <input
                  {...register("lastName", {})}
                  type="text"
                  placeholder="Last name..."
                />
              </label>
            </div>
            <label
              className={styles.formInputTextLabel + " formInputTextLabel"}
            >
              <input
                {...register("email", {})}
                type="text"
                placeholder="E-mail..."
              />
            </label>
            <label
              className={styles.formInputTextLabel + " formInputTextLabel"}
            >
              <input
                {...register("username", {})}
                type="text"
                placeholder="Username..."
              />
            </label>
            <div className={styles.formInputSideBySide}>
              <label
                className={styles.formInputTextLabel + " formInputTextLabel"}
              >
                <input
                  {...register("password", {})}
                  type="password"
                  placeholder="Password..."
                />
              </label>
              <label
                className={styles.formInputTextLabel + " formInputTextLabel"}
              >
                <input
                  {...register("repeatPassword", {})}
                  type="password"
                  placeholder="Repeat Password..."
                />
              </label>
            </div>
          </div>
          <div className={styles.formFooter}>
            <button type="submit" className={styles.buttonAction}>
              Sign up
            </button>
            <span>
              <p>Already have an account?&nbsp;</p>
              <Link href="/authentication">
                <p className={styles.hrefAction}>Sign In now!</p>
              </Link>
            </span>
          </div>
        </motion.div>
      </form>
    </div>
  );
};

export default SignUpForm;
