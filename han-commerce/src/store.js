import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import favReducer from "./features/favoriteSlice";
import userReducer from "./features/userSlice";
import categoryReducer from "./features/categorySlice";
import blogReducer from "./features/blogSlice";
import historyReducer from "./features/historySlice";
import suggestionReducer from "./features/suggestionSlice";
import discountReducer from "./features/discountSlice";
import countDownReducer from "./features/countdownSlice";
// import productReducer from "./features/productSlice";
import productReducer from "./features/productSlice";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favReducer,
    products: productReducer,
    user: userReducer,
    categories: categoryReducer,
    blogs: blogReducer,
    discount: discountReducer,
    history: historyReducer,
    suggestion: suggestionReducer,
    countDown: countDownReducer,
  },
});
export default store;
