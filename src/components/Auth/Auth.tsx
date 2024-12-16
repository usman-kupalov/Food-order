import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@store/store.ts";

export const Auth = ({ children }: { children: ReactNode }) => {
  const jwt = useSelector((s: RootState) => s.user.jwt);

  if (!jwt) {
    return <Navigate to={"/auth/login"} replace />;
  }

  return <>{children}</>;
};
