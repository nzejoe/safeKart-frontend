import { configureStore } from "@reduxjs/toolkit";

import productReducer from './product-slice';
import userReducer from './user-slice';
import cartReducer from './cart-slice';


const store = configureStore({
    reducer:{
        products: productReducer,
        users: userReducer,
        carts: cartReducer,
    }
})

export default store;