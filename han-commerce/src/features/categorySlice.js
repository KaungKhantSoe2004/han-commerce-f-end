import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
};
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setInitialCategories: (state, action) => {
      state.categories = action.payload;
    },
    removeCategories: (state, action) => {
      state.categories = [];
    },
  },
});
export const { setInitialCategories, removeCategories } = categorySlice.actions;
export default categorySlice.reducer;
