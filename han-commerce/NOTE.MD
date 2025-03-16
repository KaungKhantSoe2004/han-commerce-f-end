React Redux toolkit ကိုလေ့လာအသုံးပြုမယ်။
---- Installation Setup-----
npm install @redux/toolkit react-redux

create store.js file under src folder

<!-- store.js file  -->

import {configureStore} from "@reduxjs/toolkit"
export const store = configureStore({
reducer: {

    }

})

<!-- index.js file -->

import {store} from './store'  
import {Provider} from 'react-redux'

root.render(
<Provider store={store}>
<App />
</Provider>
)

<!-- create features folder under src folder -->

<!-- userSlice.js -->

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
name: '',
email: '',
};

const userSlice = createSlice({
name: 'user',
initialState,
reducers: {
setUser: (state, action) => {
state.name = action.payload.name;
state.email = action.payload.email;
},
clearUser: (state) => {
state.name = '';
state.email = '';
},
},
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

<!-- favoritesSlice.js -->

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
favorites: [],
};

const favoritesSlice = createSlice({
name: 'favorites',
initialState,
reducers: {
addToFavorites: (state, action) => {
state.favorites.push(action.payload);
},
removeFromFavorites: (state, action) => {
state.favorites = state.favorites.filter(
(item) => item.id !== action.payload.id
);
},
},
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;

<!-- cartSlice.js -->

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
cart: [],
};

const cartSlice = createSlice({
name: 'cart',
initialState,
reducers: {
addToCart: (state, action) => {
state.cart.push(action.payload);
},
removeFromCart: (state, action) => {
state.cart = state.cart.filter((item) => item.id !== action.payload.id);
},
},
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
