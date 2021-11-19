import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookie from 'js-cookie';

const csrftoken = Cookie.get('csrftoken');

export const userLogin = createAsyncThunk(
    'users/login',
    async (payload, { rejectWithValue, getState })=>{

        try {
            const response = await axios({
              url: "/accounts/login/",
              method: "POST",
              headers: {
                "Content-type": "application/json",
                "X-CSRFToken": csrftoken,
              },
              data: payload,
            });

            return response.data;
        } catch (err) {
            const error = err
            if(!error.response){
                throw err
            }
            return rejectWithValue(error.response.data)
        }
    }
);

const {actions, reducer} = createSlice({
    name:'users',
    initialState: {
        authUser: null,
        currentRequestId: null,
        error: null,
        refresh: 0,
    },
    reducers:{
        setUser(state, action){
            const user = JSON.parse(localStorage.getItem("safekartUser"));
            state.authUser = user;
        }
    },
    extraReducers:{
        [userLogin.pending]: (state, action)=>{
            const { requestId } = action.meta;
            state.currentRequestId = requestId;
            // remove auth user from localstorage
            localStorage.removeItem('safekartUser');
        },
        [userLogin.fulfilled]: (state, action)=>{
            const { requestId } = action.meta;
            if(state.currentRequestId === requestId){
                localStorage.setItem("safekartUser", JSON.stringify(action.payload));
                state.currentRequestId = null;
                state.error = null;
                state.refresh++
            }
        },
        [userLogin.rejected]: (state, action)=>{
            const { requestId } = action.meta;
            if(state.currentRequestId === requestId){
                state.currentRequestId = null;
                state.authUser = null;
                state.refresh++;
                state.error = action.payload
                console.log(state.error);
            }
        }
    }
});

export { actions }

export default reducer;
