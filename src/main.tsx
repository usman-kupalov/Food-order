import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "@layout/Menu/Layout.tsx";
import { Cart } from "@pages/Cart/Cart.tsx";
import { NotFound } from "@pages/NotFound/NotFound.tsx";
import { Product } from "@pages/Product/Product.tsx";
import axios from "axios";
import Menu from "@pages/Menu/Menu.tsx";
import { AuthLayout } from "@layout/Auth/AuthLayout.tsx";
import { Login } from "@pages/Login/Login.tsx";
import { Register } from "@pages/Register/Register.tsx";
import { Auth } from "@components/Auth/Auth.tsx";
import { Provider } from "react-redux";
import { store } from "@store/store.ts";
import { PREFIX } from "@src/constants.ts";
import { Success } from "@pages/Success/Success.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Auth>
        <Layout />
      </Auth>
    ),
    children: [
      {
        path: "/",
        element: <Menu />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/bucket",
        element: <Cart />,
      },
      {
        path: "/product/:id",
        element: <Product />,
        errorElement: <>Ошибка</>,
        loader: async ({ params }) => {
          const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
          return data;
        },
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
