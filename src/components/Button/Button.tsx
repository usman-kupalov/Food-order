import styles from "./Button.module.css";
import { ButtonHTMLAttributes, ReactNode } from "react";
import cn from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  appearance?: "big" | "small";
}

export const Button = ({
  children,
  className,
  appearance = "small",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(styles["button"], styles["accent"], className, {
        [styles["small"]]: appearance === "small",
        [styles["big"]]: appearance === "big",
      })}
      {...props}
    >
      {children}
    </button>
  );
};
