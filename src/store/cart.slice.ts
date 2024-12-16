import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  count: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
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
