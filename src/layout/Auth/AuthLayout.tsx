import styles from "./AuthLayout.module.css";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className={styles["layout"]}>
      <div className={styles["logo"]}>
        <img src={"/logo.svg"} alt={"Logo"} />
      </div>

      <div className={styles["content"]}>
        <Outlet />
      </div>
    </div>
  );
};
