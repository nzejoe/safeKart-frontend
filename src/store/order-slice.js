import { createSlice } from "@reduxjs/toolkit";

const { actions, reducer } = createSlice({
  name: "orders",
  initialState: {
    order: null,
  },
  reducers: {
    saveOrder(state, actions) {
      state.order = actions.payload;
    },
  },
});

export { actions };
export default reducer;
