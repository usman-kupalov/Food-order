import { Heading } from "@components/Headling/Heading.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/store.ts";
import { CartItem } from "@components/CartItem/CartItem.tsx";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import styles from "./Cart.module.css";
import { DELIVERY_FEE, PREFIX } from "@src/constants.ts";
import { Product } from "@src/interface.ts";
import { Button } from "@components/Button/Button.tsx";
import { useNavigate } from "react-router-dom";
import { cartActions } from "@store/cart.slice.ts";

export const Cart = () => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const jwt = useSelector((s: RootState) => s.user.jwt);
  const items = useSelector((s: RootState) => s.cart.items);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const total =
    items
      .map((i) => {
        const product = cartProducts.find((p) => p.id === i.id);
        if (!product) {
          return 0;
        }
        return i.count * product.price;
      })
      .reduce((acc, i) => acc + i, 0) + DELIVERY_FEE;

  const getItem = async (id: number) => {
    const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
    return data;
  };

  const loadAllItems = async () => {
    const products = await Promise.all(items.map((i) => getItem(i.id)));
    setCartProducts(products);
  };

  const checkout = async () => {
    try {
      await axios.post(
        `${PREFIX}/order`,
        {
          products: items,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      dispatch(cartActions.clean());
      navigate("/success");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          alert("Вы не авторизованы");
        } else {
          alert("Произошла ошибка");
        }
      }
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    void loadAllItems();
  }, [items]);

  return (
    <>
      <Heading className={styles["heading"]}>Корзина</Heading>
      {items.map((i) => {
        const product = cartProducts.find((p) => p.id === i.id);
        if (!product) {
          return;
        }
        return <CartItem key={product.id} count={i.count} {...product} />;
      })}

      <div className={styles["line"]}>
        <div className={styles["text"]}>Итог</div>
        <div className={styles["price"]}>
          {total}&nbsp;
          <span>$</span>
        </div>
      </div>
      <hr className={styles["hr"]} />

      <div className={styles["line"]}>
        <div className={styles["text"]}>Доставка</div>
        <div className={styles["price"]}>
          {DELIVERY_FEE}&nbsp;
          <span>$</span>
        </div>
      </div>

      <hr className={styles["hr"]} />
      <div className={styles["line"]}>
        <div className={styles["text"]}>
          Итог <span className={styles["total-count"]}>({items.length})</span>
        </div>
        <div className={styles["price"]}>
          {total + DELIVERY_FEE}&nbsp;
          <span>$</span>
        </div>
      </div>

      <div className={styles["checkout"]}>
        <Button appearance={"big"} onClick={checkout}>
          Оформить
        </Button>
      </div>
    </>
  );
};
