import { Heading } from "@components/Headling/Heading.tsx";
import { useSelector } from "react-redux";
import { RootState } from "@store/store.ts";
import { CartItem } from "@components/CartItem/CartItem.tsx";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Cart.module.css";
import { DELIVERY_FEE, PREFIX } from "@src/constants.ts";
import { Product } from "@src/interface.ts";

export const Cart = () => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const items = useSelector((s: RootState) => s.cart.items);
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
    </>
  );
};
