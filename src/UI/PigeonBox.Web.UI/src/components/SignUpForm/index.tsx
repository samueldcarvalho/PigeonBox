import Link from "next/link";
import styles from "./styles.module.css";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useContext, useRef } from "react";
import { AuthContext } from "../../shared/contexts/AuthProvider";
import Router from "next/router";

interface IRegisterProps {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  repeatPassword: string;
  email: string;
}

const SignUpForm = () => {
  const { Register, Login } = useContext(AuthContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<IRegisterProps>();

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = handleSubmit(async (data) => {
    const success = await Register({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      username: data.username,
      password: data.password,
    });

    if (!success) return;

    const logged = await Login(data.username, data.password);

    if (!logged) return;

    Router.push("/");
  });

  return (
    <div className={styles.formContainer}>
      <form autoComplete="off" onSubmit={onSubmit} className={styles.form}>
        <motion.div
          initial={{ height: 400, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ type: "spring", duration: 0.3 }}
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
                  {...register("firstName", {
                    required: { value: true, message: "Required" },
                    minLength: {
                      value: 3,
                      message: "First name must be have 3 characters",
                    },
                    maxLength: { value: 17, message: "Max length is 17" },
                    pattern: {
                      value: RegExp(/^[a-zA-Z]*$/),
                      message: "Invalid name",
                    },
                  })}
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
                  {...register("lastName", {
                    required: { value: true, message: "Required" },
                    minLength: {
                      value: 3,
                      message: "Last name must be have 3 characters",
                    },
                    maxLength: { value: 25, message: "Max length is 25" },
                    pattern: {
                      value: RegExp(/^[a-zA-Z]*$/),
                      message: "Invalid last name",
                    },
                  })}
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
                {...register("email", {
                  required: { value: true, message: "Required" },
                  pattern: {
                    value: RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i),
                    message: "Invalid e-mail",
                  },
                })}
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
                {...register("username", {
                  required: { value: true, message: "Required" },
                  minLength: {
                    value: 5,
                    message: "Username must be have 5 characters",
                  },
                  maxLength: { value: 20, message: "Max length is 20" },
                  pattern: {
                    value: RegExp(/^[A-Za-z0-9_-]*$/),
                    message: "Invalid username",
                  },
                })}
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
                  {...register("password", {
                    required: { value: true, message: "Required" },
                    minLength: {
                      value: 6,
                      message: "Password must be have 6 characters",
                    },
                  })}
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
                  {...register("repeatPassword", {
                    required: true,
                    validate: (value) =>
                      value === password.current || "The passwords don't match",
                  })}
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
