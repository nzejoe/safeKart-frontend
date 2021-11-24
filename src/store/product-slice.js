import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getProducts = createAsyncThunk(
    'product/all',
    async (payload, { rejectWithValue, getState })=>{
        try {
            const response = await axios({
                url:'/products/',
                method: 'GET',
            })
            return response.data
        } catch (err) {
            const error = err
            if(!error.response){
                throw err
            }

            return rejectWithValue(error.response.data)
        }
    }
    
)


const {actions, reducer} = createSlice({
    name: 'products',
    initialState:{
        allProducts: [],
        filteredProducts: [],
        currentRequestId: null,
    },
    reducers: {
        getFilteredProducts(state, action){

        }
    },
    extraReducers:{
        [getProducts.pending]:(state, action)=>{
            const { requestId } = action.meta
            state.currentRequestId = requestId
        },

        [getProducts.fulfilled]:(state, action)=>{
            const { requestId } = action.meta
            if(state.currentRequestId === requestId){
                state.allProducts = action.payload;
                state.filteredProducts = state.allProducts;
                state.currentRequestId = null
            }
        },

        [getProducts.rejected]:(state, action)=>{
            const { requestId } = action.meta
            if(state.currentRequestId === requestId){
                console.log(action.payload)
                state.currentRequestId = null
            }
        },
    }
})

export { actions };
export default reducer;