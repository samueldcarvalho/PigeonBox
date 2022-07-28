import Link from "next/link";
import styles from "./styles.module.css";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

interface IRegisterProps {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  repeatPassword: string;
  email: string;
}

const SignUpForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IRegisterProps>();

  const onSubmit = handleSubmit((data) => {
    alert(JSON.stringify(data));
  });

  return (
    <div className={styles.formContainer}>
      <form autoComplete="off" onSubmit={onSubmit} className={styles.form}>
        <motion.div
          initial={{ height: 400, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{
            type: "spring",
            duration: 0.4,
            bounce: 0.3,
          }}
          className={styles.formConduce}
        >
          <span className={styles.formHeader}>
            <h1>Create new Account</h1>
          </span>
          <div className={styles.formBody}>
            <div className={styles.formInputSideBySide}>
              <label
                className={`${styles.formInputTextLabel} ${
                  errors.firstName ? "formInputTextLabelError" : ""
                } formInputTextLabel`}
              >
                <input
                  {...register("firstName", { required: true })}
                  name="firstName"
                  type="text"
                  autoComplete="false"
                  placeholder="First name..."
                />
              </label>
              <label
                className={`${styles.formInputTextLabel} ${
                  errors.lastName ? "formInputTextLabelError" : ""
                } formInputTextLabel`}
              >
                <input
                  {...register("lastName", { required: true })}
                  name="lastName"
                  type="text"
                  placeholder="Last name..."
                />
              </label>
            </div>
            <label
              className={`${styles.formInputTextLabel} ${
                errors.email ? "formInputTextLabelError" : ""
              } formInputTextLabel`}
            >
              <input
                {...register("email", { required: true })}
                name="email"
                type="text"
                placeholder="E-mail..."
              />
            </label>
            <label
              className={`${styles.formInputTextLabel} ${
                errors.username ? "formInputTextLabelError" : ""
              } formInputTextLabel`}
            >
              <input
                {...register("username", { required: true })}
                name="username"
                type="text"
                placeholder="Username..."
              />
            </label>
            <div className={styles.formInputSideBySide}>
              <label
                className={`${styles.formInputTextLabel} ${
                  errors.password ? "formInputTextLabelError" : ""
                } formInputTextLabel`}
              >
                <input
                  {...register("password", { required: true })}
                  name="password"
                  type="password"
                  placeholder="Password..."
                />
              </label>
              <label
                className={`${styles.formInputTextLabel} ${
                  errors.repeatPassword ? "formInputTextLabelError" : ""
                } formInputTextLabel`}
              >
                <input
                  {...register("repeatPassword", { required: true })}
                  name="repeatPassword"
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
