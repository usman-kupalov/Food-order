import { Heading } from "@components/Headling/Heading.tsx";
import { useSelector } from "react-redux";
import { RootState } from "@store/store.ts";
import { CartItem } from "@components/CartItem/CartItem.tsx";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Cart.module.css";
import { PREFIX } from "@src/constants.ts";
import { Product } from "@src/interface.ts";

export const Cart = () => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const items = useSelector((s: RootState) => s.cart.items);

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
    </>
  );
};
