import Link from "next/link";
import Router from "next/router";
import styles from "./styles.module.css";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { AuthContext } from "../../shared/contexts/AuthProvider";
import { useForm } from "react-hook-form";

interface LoginFormProps {
  username: string;
  password: string;
}

const LoginForm = () => {
  const { SignIn } = useContext(AuthContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormProps>();

  const onSubmit = handleSubmit(async (data) => {
    const logged = await SignIn(data.username, data.password);

    if (!logged) return;

    Router.push("/");
  });

  return (
    <div className={styles.formContainer}>
      <form onSubmit={onSubmit} className={styles.form}>
        <motion.div
          initial={{ marginBottom: 50, height: 400, opacity: 0 }}
          animate={{ marginBottom: 0, height: 350, opacity: 1 }}
          transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}
          className={styles.formConduce}
        >
          <span className={styles.formHeader}>
            <h1>Sign in with</h1>
          </span>
          <div className={styles.formBody}>
            <label
              className={`${styles.formInputTextLabel} ${
                errors.username ? "formInputTextLabelError" : ""
              } formInputTextLabel`}
            >
              <input
                {...register("username", { required: true })}
                type="text"
                name="username"
                placeholder="Your username..."
              />
            </label>
            <label
              className={`${styles.formInputTextLabel} ${
                errors.password ? "formInputTextLabelError" : ""
              } formInputTextLabel`}
            >
              <input
                {...register("password", { required: true })}
                type="password"
                name="password"
                placeholder="Your password..."
              />
            </label>
          </div>
          <div className={styles.formFooter}>
            <button type="submit" className={styles.buttonAction}>
              Sign in
            </button>
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
