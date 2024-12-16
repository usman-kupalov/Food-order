import { Product } from "@/interface.ts";
import { ProductCard } from "@components/ProductCard/ProductCard.tsx";
import React from "react";
import styles from "./MenuList.module.css";

interface MenuListProps {
  products: Product[];
}

export const MenuList: React.FC<MenuListProps> = ({ products }) => {
  return (
    <div className={styles["wrapper"]}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          description={product.ingredients.join(", ")}
          rating={product.rating}
          price={product.price}
          image={product.image}
        />
      ))}
    </div>
  );
};
