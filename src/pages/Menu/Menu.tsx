import { Heading } from "@components/Headling/Heading.tsx";
import { Search } from "@components/Search/Search.tsx";
import styles from "./Menu.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { MenuList } from "@pages/Menu/MenuList/MenuList.tsx";
import { PREFIX } from "@src/constants.ts";
import { Product } from "@src/interface.ts";

export const Menu = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [searchValue, setSearchValue] = useState<string>();

  useEffect(() => {
    void getMenu(searchValue);
  }, [searchValue]);

  const getMenu = async (name?: string) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
        params: {
          name: name,
        },
      });
      setProducts(data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      if (err instanceof AxiosError) {
        setError(err.message);
      }
      setIsLoading(false);
      return;
    }
  };

  const filterProducts = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <div className={styles["head"]}>
        <Heading>Меню</Heading>
        <Search
          placeholder={"Введите блюдо или состав"}
          onChange={filterProducts}
        />
      </div>

      <div>
        {error && <div>{error}</div>}
        {!isLoading && products.length > 0 && <MenuList products={products} />}
        {isLoading && <>Loading...</>}
        {!isLoading && products.length === 0 && <>Не найдено блюд по запросу</>}
      </div>
    </>
  );
};

export default Menu;
