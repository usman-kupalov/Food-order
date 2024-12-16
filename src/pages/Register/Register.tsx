import { Heading } from "@components/Headling/Heading.tsx";
import { Input } from "@components/Input/Input.tsx";
import styles from "./Register.module.css";
import { Button } from "@components/Button/Button.tsx";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/store.ts";
import { register, userActions } from "@store/user.slice.ts";

type RegisterForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
  name: {
    value: string;
  };
};

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user);
  useEffect(() => {
    if (jwt) navigate("/");
  }, [jwt, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearRegisterError());
    const target = e.target as typeof e.target & RegisterForm;
    const { email, password, name } = target;
    dispatch(
      register({
        email: email.value,
        password: password.value,
        name: name.value,
      }),
    );
  };

  return (
    <div className={styles["login"]} onSubmit={submit}>
      <Heading>Регистрация</Heading>
      {registerErrorMessage && (
        <div className={styles["error"]}>{registerErrorMessage}</div>
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

        <div className={styles["field"]}>
          <label htmlFor="name">Пароль</label>
          <Input type="text" name={"name"} id="name" placeholder={"Ваше имя"} />
        </div>

        <Button appearance={"big"}>Зарегистрироваться</Button>
      </form>

      <div className={styles["links"]}>
        <div>Есть аккаунта?</div>
        <Link to={"/auth/login"}>Войти</Link>
      </div>
    </div>
  );
};
