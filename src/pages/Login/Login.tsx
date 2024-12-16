import { Heading } from "@components/Headling/Heading.tsx";
import { Input } from "@components/Input/Input.tsx";
import styles from "./Login.module.css";
import { Button } from "@components/Button/Button.tsx";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/store.ts";
import { login, userActions } from "@store/user.slice.ts";

type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user);
  useEffect(() => {
    if (jwt) navigate("/");
  }, [jwt, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearLoginError());
    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    await sendLogin(email.value, password.value);
  };

  const sendLogin = async (email: string, password: string) => {
    dispatch(login({ email, password }));
  };

  return (
    <div className={styles["login"]} onSubmit={submit}>
      <Heading>Вход</Heading>
      {loginErrorMessage && (
        <div className={styles["error"]}>{loginErrorMessage}</div>
      )}

      <form className={styles["form"]}>
        <div className={styles["field"]}>
          <label htmlFor="login">Ваш email</label>
          <Input id="email" name={"email"} placeholder={"Email"} />
        </div>

        <div className={styles["field"]}>
          <label htmlFor="password">Пароль</label>
          <Input
            type="password"
            name={"password"}
            id="password"
            placeholder={"Пароль"}
          />
        </div>

        <Button appearance={"big"}>Вход</Button>
      </form>

      <div className={styles["links"]}>
        <div>Нет аккаунта?</div>
        <Link to={"/auth/register"}>Зарегистрироваться</Link>
      </div>
    </div>
  );
};
