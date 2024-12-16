import styles from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@store/store.ts";
import { cartActions } from "@store/cart.slice.ts";

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  rating: number;
}

export const ProductCard = (props: ProductCardProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const add = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(cartActions.add(props.id));
  };

  return (
    <Link to={`/product/${props.id}`}>
      <div className={styles["card"]}>
        <div
          className={styles["head"]}
          style={{ backgroundImage: `url('${props.image}')` }}
        >
          <div className={styles["price"]}>
            {props.price}&nbsp;
            <span className={styles["currency"]}>$</span>
          </div>

          <button className={styles["add-to-cart"]} onClick={add}>
            <img src={"/cart-button-icon.svg"} alt={"Add To Bucket"} />
          </button>

          <div className={styles["rating"]}>
            {props.rating}&nbsp;
            <img src={"/star-icon.svg"} alt={"Star"} />
          </div>
        </div>

        <div className={styles["footer"]}>
          <div className={styles["title"]}>{props.name}</div>
          <div className={styles["description"]}>{props.description}</div>
        </div>
      </div>
    </Link>
  );
};
