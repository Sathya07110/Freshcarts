
import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "../features/products/productsSlice";
import cartReducer, {
  saveCartToStorage,
} from "../features/cart/cartSlice";
import ordersReducer from "../features/orders/ordersSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveCartToStorage),
});

export default store;
