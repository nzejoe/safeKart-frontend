import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import Cookies from "js-cookie";

// cart list
export const getCartList = createAsyncThunk(
  "cart/list",
  async (payload, { getState, rejectWithValue }) => {
    const token = payload;
    try {
      const response = await axios({
        url: "/carts/",
        method: "GET",
        headers: {
          authorization: token ? `token ${token}` : "",
        },
      });
      return response.data;
    } catch (error) {
      const err = error;
      if (!err) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
); // cart list //

// add to cart
export const addToCart = createAsyncThunk(
  "cart/add",
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
      });
      return res.data;
    } catch (error) {
      const err = error;
      if (!err) {
        throw error;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

const { actions, reducer } = createSlice({
  name: "carts",
  initialState: {
    cartList: [],
    refresh: 0,
    loading: false,
    currentRequestId: null,
  },
  reducers: {
    refreshCart(state, action) {
      state.refresh++;
    },

    guestAddToCart(state, action) {
      const data = action.payload;
      console.log(data);
      // get cartitem from storage or create an empty array
      let cartItems =
        JSON.parse(localStorage.getItem("safekart_cartItem")) || [];

      // check if any cart item
      if (cartItems.length > 0) {
        // check if user already have this item in his cart
        const existingItem = cartItems.find(
          (item) => item.variation_id === data.variation_id
        );
        // if already has item in cart
        if (existingItem) {
          let newItems = cartItems.map((item) => {
            if (item.variation_id === data.variation_id) {
              // increase the quantity of the item in cart
              item.quantity = item.quantity + data.quantity;
            }
            return item;
          });

          localStorage.setItem("safekart_cartItem", JSON.stringify(newItems));
          return;
        }
        // if different item then add to cart list
        cartItems.push(data);
        // save to storage
        localStorage.setItem("safekart_cartItem", JSON.stringify(cartItems));
      } else {
        // add to cart list
        cartItems.push(data);
        // save to storage
        localStorage.setItem("safekart_cartItem", JSON.stringify(cartItems));
      }
      state.refresh++
    },
    getGuestCartList(state, action) {
      state.cartList =
        JSON.parse(localStorage.getItem("safekart_cartItem")) || [];
    },
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
        state.refresh++;
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

export { actions };

export default reducer;
