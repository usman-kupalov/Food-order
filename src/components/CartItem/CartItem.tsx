import styles from "./CartItem.module.css";
import { cartActions } from "@store/cart.slice.ts";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@store/store.ts";

interface CartItemProps {
  id: number;
  name: string;
  image: string;
  price: number;
  count: number;
}

export const CartItem = (props: CartItemProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const increase = () => {
    dispatch(cartActions.add(props.id));
  };

  const decrease = () => {
    dispatch(cartActions.remove(props.id));
  };

  const remove = () => {
    dispatch(cartActions.delete(props.id));
  };

  return (
    <div className={styles["item"]}>
      <div
        className={styles["image"]}
        style={{ backgroundImage: `url('${props.image}')` }}
      ></div>

      <div className={styles["description"]}>
        <div className={styles["name"]}>{props.name}</div>
        <div className={styles["price"]}>{props.price}&nbsp;$</div>
      </div>

      <div className={styles["actions"]}>
        <button className={styles["minus"]} onClick={decrease}>
          <img src={"/minus-icon.svg"} alt={"decrease"} />
        </button>

        <div className={styles["number"]}>{props.count}</div>

        <button className={styles["plus"]} onClick={increase}>
          <img src={"/plus-icon.svg"} alt={"increase"} />
        </button>

        <button className={styles["remove"]} onClick={remove}>
          <img src={"/delete-icon.svg"} alt={"remove"} />
        </button>
      </div>
    </div>
  );
};
