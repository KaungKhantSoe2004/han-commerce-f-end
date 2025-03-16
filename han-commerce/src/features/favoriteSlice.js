import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  favorites: [],
};

const favSlice = createSlice({
  name: "favorites",
  initialState: initialState,
  reducers: {
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    removeFromFavorites: (state, action) => {
      const newFav = state.favorites.filter(
        (each) => each.id !== action.payload.id
      );
      state.favorites = newFav;
    },
    clearFavorites: (state, action) => {
      state.favorites = [];
    },
  },
});

export const {
  addToFavorites,
  setFavorites,
  removeFromFavorites,
  clearFavorites,
} = favSlice.actions;
export default favSlice.reducer;
