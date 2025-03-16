import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  suggestion: [],
};
const suggestionSlice = createSlice({
  name: "suggestion",
  initialState,
  reducers: {
    setInitialSuggestion: (state, action) => {
      state.suggestion = action.payload;
    },
    removeSuggestion: (state, action) => {
      state.suggestion = [];
    },
  },
});
export const { setInitialSuggestion, removeSuggestion } =
  suggestionSlice.actions;
export default suggestionSlice.reducer;
