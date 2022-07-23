/** @format */

import { ReactNode } from "react";
import styles from "./styles.module.css";

const WrapperLayout = ({ children }: { children: ReactNode }) => {
  return <div className={styles.wrapperBackground}>{children}</div>;
};

export default WrapperLayout;
