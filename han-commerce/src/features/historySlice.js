import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  history: [],
};
const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    setHistory: (state, action) => {
      state.history = action.payload;
    },
    removeHistory: (state, action) => {
      state.history = [];
    },
    addToHistory: (state, action) => {
      state.history.push(action.payload);
    },
    removeFromHistory: (state, action) => {
      let newHistory = state.history.filter(
        (each) => each.id !== action.payload.id
      );
      state.history = newHistory;
    },
  },
});
export const { setHistory, removeHistory, addToHistory, removeFromHistory } =
  historySlice.actions;
export default historySlice.reducer;
