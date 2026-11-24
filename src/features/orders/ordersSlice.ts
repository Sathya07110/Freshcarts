
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Order } from "../../types";
import type { RootState } from "../../store/store";

interface OrdersState {
  items: Order[];
}

const initialState: OrdersState = { items: [] };

const ordersSlice = createSlice({
  name: "orders",

  initialState,

  reducers: {
    addOrder(state, action: PayloadAction<Order>) {
      state.items.push(action.payload);
    },

    clearOrders(state) {
      state.items = [];
    },
  },
});

export const { addOrder, clearOrders } = ordersSlice.actions;

export const selectOrders = (state: RootState) => state.orders.items;

export default ordersSlice.reducer;
