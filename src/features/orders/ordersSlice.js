
import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",

  initialState: {
    items: [],
  },

  reducers: {
    addOrder(state, action) {
      state.items.push(action.payload);
    },

    clearOrders(state) {
      state.items = [];
    },
  },
});

export const { addOrder, clearOrders } = ordersSlice.actions;

export const selectOrders = (state) => state.orders.items;

export default ordersSlice.reducer;
