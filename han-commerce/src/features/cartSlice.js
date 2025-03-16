// import { createSlice } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeCart: (state, action) => {
      let id = action.payload.id;
      let tempoCart = state.cart.filter((each) => each.id !== id);
      state.cart = tempoCart;
    },
  },
});
export const { setCart, removeCart } = cartSlice.actions;
export default cartSlice.reducer;
