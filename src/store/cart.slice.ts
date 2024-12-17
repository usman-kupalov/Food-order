import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState } from "@store/storage.ts";
import { CART_PERSISTENT_STATE } from "@src/constants.ts";

interface CartItem {
  id: number;
  count: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = loadState<CartState>(CART_PERSISTENT_STATE) ?? {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    clean: (state) => {
      state.items = [];
    },
    delete: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      const existedItem = state.items.find(
        (item) => item.id === action.payload,
      );
      if (existedItem) {
        if (existedItem.count === 1) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload,
          );
          return;
        } else {
          state.items.map((i) => {
            if (i.id === action.payload) {
              i.count--;
            }
            return i;
          });
          return;
        }
      }
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    add: (state, action: PayloadAction<number>) => {
      const existedItem = state.items.find(
        (item) => item.id === action.payload,
      );
      if (!existedItem) {
        state.items.push({ id: action.payload, count: 1 });
        return;
      }
      state.items.map((i) => {
        if (i.id === action.payload) {
          i.count++;
        }
        return i;
      });
    },
  },
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
