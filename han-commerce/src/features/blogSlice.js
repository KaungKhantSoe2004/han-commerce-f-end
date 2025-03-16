import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
};
const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setInitialBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    removeBlogs: (state, action) => {
      state.blogs = [];
    },
  },
});

export const { setInitialBlogs, removeBlogs } = blogSlice.actions;
export default blogSlice.reducer;
