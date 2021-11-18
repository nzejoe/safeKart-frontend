import { configureStore } from "@reduxjs/toolkit";

import productReducer from './product-slice';


const store = configureStore({
    reducer:{
        products: productReducer,
    }
})

export default store;