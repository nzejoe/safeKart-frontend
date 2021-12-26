import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import Cookies from "js-cookie";

// cart list
export const getCartList = createAsyncThunk(
  'cart/list',
  async(payload, { getState, rejectWithValue })=>{
    const token  = payload
    try {
      const response = await axios({
        url: "/carts/",
        method: "GET",
        headers: {
          authorization: token ? `token ${token}` : "",
        },
      });
      return response.data

    } catch (error) {
      const err = error
      if(!err){
        throw error
      }

      return rejectWithValue(error.response.data)
    }
  }
)// cart list //

// add to cart
export const addToCart = createAsyncThunk(
  'cart/add',
  async (payload, { rejectWithValue }) => {
    const { data, token } = payload;
    try {
      const res = await axios({
        url: "/carts/add_to_cart/",
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
          authorization: token ? `token ${token}` : "",
        },
        data: data,
      })
      return res.data

    } catch (error) {
      const err = error;
      if(!err){
        throw error
      }

      return rejectWithValue(err.response.data);
    }
  }
) 


const { actions, reducer } = createSlice({
  name: "carts",
  initialState: {
    cartList: null,
    refresh: 0,
    loading: false,
    currentRequestId: null,
  },
  reducers: {
    refreshCart(state, action){
      state.refresh ++
    }
  },

  extraReducers: {
    // get cart list
    [getCartList.pending]: (state, action) => {
      const { requestId } = action.meta;
      state.currentRequestId = requestId;
      state.loading = true;
    },
    [getCartList.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      if (state.currentRequestId === requestId) {
        state.cartList = action.payload;
        state.currentRequestId = null;
        state.loading = false;
      }
    },
    [getCartList.rejected]: (state, action) => {
      const { requestId } = action.meta;
      if (state.currentRequestId === requestId) {
        console.log(action.payload);
        state.currentRequestId = null;
        state.loading = false;
      }
    },
    // add to cart
    [addToCart.pending]: (state, action) => {
      const { requestId } = action.meta;
      state.currentRequestId = requestId;
      state.loading = true;
    },
    [addToCart.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      if (state.currentRequestId === requestId) {
        state.refresh ++
        state.currentRequestId = null;
        state.loading = false;
      }
    },
    [addToCart.rejected]: (state, action) => {
      const { requestId } = action.meta;
      if (state.currentRequestId === requestId) {
        console.log(action.payload);
        state.currentRequestId = null;
        state.loading = false;
      }
    },
  },
});

export { actions }

export default reducer;