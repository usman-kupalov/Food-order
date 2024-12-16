import { forwardRef, InputHTMLAttributes } from "react";
import styles from "./Input.module.css";
import cn from "classnames";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ isValid = true, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(styles["input"], className, {
          [styles["invalid"]]: isValid,
        })}
        {...props}
      />
    );
  },
);
