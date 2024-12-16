import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@store/user.slice.ts";
import { saveState } from "@store/storage.ts";
import { JWT_PERSISTENT_STATE } from "@/constants.ts";
import cartSlice from "@store/cart.slice.ts";

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
  },
});

store.subscribe(() => {
  saveState({ jwt: store.getState().user.jwt }, JWT_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
