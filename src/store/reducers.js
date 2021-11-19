import { configureStore } from "@reduxjs/toolkit";

import productReducer from './product-slice';
import userReducer from './user-slice';


const store = configureStore({
    reducer:{
        products: productReducer,
        users: userReducer,
    }
})

export default store;