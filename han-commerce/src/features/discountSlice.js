import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  discount: [],
};
const discountSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {
    setInitialDiscounts: (state, action) => {
      state.discount = action.payload;
    },
    removeDiscounts: (state, action) => {
      state.discount = [];
    },
  },
});

export const { setInitialDiscounts, removeDiscounts } = discountSlice.actions;
export default discountSlice.reducer;
