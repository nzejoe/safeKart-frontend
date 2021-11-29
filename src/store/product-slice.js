import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "product/all",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const response = await axios({
        url: "/products/",
        method: "GET",
      });
      return response.data;
    } catch (err) {
      const error = err;
      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

const { actions, reducer } = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    filteredProducts: [],
    filter: {
      search: "",
      color: "all",
      brand: "all",
      category: 'all',
      price: 0,
    },
    currentRequestId: null,
  },
  reducers: {
    getFilterProducts: (state, action) => {
      const { search, color, brand, category, price } = current(state.filter);
      let tempProducts = current(state.allProducts); // initiate products in every render

      if (search) {
        tempProducts = tempProducts.filter(
          (product) =>
            product.product_name
              .toLowerCase()
              .startsWith(search.toLowerCase())
        );
      }

      if (color !== 'all') {
        tempProducts = tempProducts.filter((product) =>
          product.variations.colors.includes(color)
        );
      }

      if (brand !== 'all') {
        tempProducts = tempProducts.filter((product) =>
          product.variations.brand.includes(brand)
        );
      }

      if (category !== 'all') {
        tempProducts = tempProducts.filter((product) =>
          product.category === category
        );
      }

      if (price) {
        tempProducts = tempProducts.filter(
          (product) => parseFloat(product.price) <= price
        );
      }
      // set filter products state to filtered temp products
      state.filteredProducts = tempProducts;
    },
    // filter reducers
    searchFilter(state, action) {
      const query = action.payload;
      state.filter.search = query;
    },
    colorFilter(state, action) {
      const color = action.payload;
       state.filter.color = color;
    },
    brandFilter(state, action) {
      const brand = action.payload;
       state.filter.brand = brand;
    },
    categoryFilter(state, action) {
      const category = action.payload;
       state.filter.category = category;
    },
    priceFilter(state, action) {
      const price = action.payload;
       state.filter.price = price;
    },
    clearFilter(state, action) {
      state.filter.color = 'all'
      state.filter.brand = 'all'
      state.filter.category = 'all'
      state.filter.search = ''
      state.filter.price = 0
    },

  },
  extraReducers: {
    [getProducts.pending]: (state, action) => {
      const { requestId } = action.meta;
      state.currentRequestId = requestId;
    },

    [getProducts.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      if (state.currentRequestId === requestId) {
        state.allProducts = action.payload;
        state.filteredProducts = state.allProducts;
        state.currentRequestId = null;
      }
    },

    [getProducts.rejected]: (state, action) => {
      const { requestId } = action.meta;
      if (state.currentRequestId === requestId) {
        console.log(action.payload);
        state.currentRequestId = null;
      }
    },
  },
});

export { actions };
export default reducer;
