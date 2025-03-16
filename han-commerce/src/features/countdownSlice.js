import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countDown: {},
};
const countdownSlice = createSlice({
  name: "countDown",
  initialState,
  reducers: {
    setCountDown: (state, action) => {
      state.countDown = action.payload;
    },
    removeCountDown: (state, action) => {
      state.countDown = {};
    },
  },
});

export const { setCountDown, removeCountDown } = countdownSlice.actions;
export default countdownSlice.reducer;
