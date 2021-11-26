import { configureStore } from "@reduxjs/toolkit";

import productReducer from './product-slice';
import userReducer from './user-slice';
import cartReducer from './cart-slice';
import orderReducer from './order-slice'


const store = configureStore({
    reducer:{
        products: productReducer,
        users: userReducer,
        carts: cartReducer,
        orders: orderReducer,
    }
})

export default store;