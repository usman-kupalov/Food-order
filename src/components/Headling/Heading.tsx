import { HTMLAttributes, ReactNode } from "react";
import cn from "classnames";
import styles from "./Heading.module.css";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export const Heading = ({ children, className, ...props }: HeadingProps) => {
  return (
    <h1 className={(cn(className), styles["h1"])} {...props}>
      {children}
    </h1>
  );
};
