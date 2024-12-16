import { forwardRef, InputHTMLAttributes } from "react";
import cn from "classnames";
import styles from "./Search.module.css";

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean;
}

export const Search = forwardRef<HTMLInputElement, SearchProps>(
  ({ isValid = true, className, ...props }, ref) => {
    return (
      <div className={styles["input-wrapper"]}>
        <input
          ref={ref}
          className={cn(styles["input"], className, {
            [styles["invalid"]]: isValid,
          })}
          {...props}
        />
        <img
          className={styles["icon"]}
          src={"/search-icon.svg"}
          alt={"Glass"}
        />
      </div>
    );
  },
);
