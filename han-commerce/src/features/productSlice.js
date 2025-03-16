import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  products: [],
};
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setInitialProducts: (state, action) => {
      const newProducts = action.payload;
      state.products = newProducts;
    },
    clearProducts: (state, action) => {
      state.products = [];
    },
  },
});
export const { setInitialProducts, clearProducts } = productSlice.actions;
export default productSlice.reducer;
