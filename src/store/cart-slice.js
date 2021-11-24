import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import Cookies from "js-cookie";


const { actions, reducer } = createSlice({
  name: "carts",
  initialState: {
    cartList: [],
    currentRequestId: null,
  },
  reducers: {

    getCartList(state, action){
        const token = action.payload;
      axios({
        url: "/carts/",
        method: "GET",
        headers: {
          authorization: token ? `token ${token}` : "",
        },
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => console.log(error));

    },
    
    addToCart(state, actions){
        const { data, token } = actions.payload
        axios({
            url: '/carts/add_to_cart/',
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
                authorization: token? `token ${token}`: ''
            },
            data: data
        })
        .then(res => console.log(res))
        .catch(error => console.log(error))
    },

  },
});

export { actions }

export default reducer;