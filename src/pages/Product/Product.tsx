import { useLoaderData, useParams } from "react-router-dom";
import { Product as Pro } from "@/interface.ts";

export const Product = () => {
  // const { id } = useParams();
  const data = useLoaderData() as Pro;

  return <>Product - {data.name}</>;
};
