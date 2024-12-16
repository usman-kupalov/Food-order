import styles from "./Layout.module.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Button } from "@components/Button/Button.tsx";
import cn from "classnames";
import { AppDispatch, RootState } from "@store/store.ts";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, userActions } from "@store/user.slice.ts";
import { useEffect } from "react";

export const Layout = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((s: RootState) => s.user.profile);
  const items = useSelector((s: RootState) => s.cart.items);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  const logout = () => {
    dispatch(userActions.logout());
    navigator("/auth/login");
  };

  return (
    <div className={styles["layout"]}>
      <div className={styles["sidebar"]}>
        <div className={styles["user"]}>
          <img
            className={styles["avatar"]}
            src={"/avatar.png"}
            alt={"avatar"}
          />
          <div className={styles["name"]}>{profile?.name}</div>
          <div className={styles["email"]}>{profile?.email}</div>
        </div>

        <div className={styles["menu"]}>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              cn(styles["link"], {
                [styles["active"]]: isActive,
              })
            }
          >
            <img src={"/menu-icon.svg"} alt={"menu"} />
            Меню
          </NavLink>
          <NavLink
            to={"/bucket"}
            className={({ isActive }) =>
              cn(styles["link"], {
                [styles["active"]]: isActive,
              })
            }
          >
            <img src={"/cart-icon.svg"} alt={"bucket"} />
            Корзина{" "}
            <span className={styles["cart-count"]}>
              {items.reduce((acc, i) => acc + i.count, 0)}
            </span>
          </NavLink>
        </div>

        <Button className={styles["exit"]} onClick={logout}>
          <img src={"/exit-icon.svg"} alt={"Exit"} />
          Выйти
        </Button>
      </div>
      <div className={styles["content"]}>
        <Outlet />
      </div>
    </div>
  );
};
