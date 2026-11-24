
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction, Middleware } from "@reduxjs/toolkit";
import type { CartItem, Product } from "../../types";
import type { RootState } from "../../store/store";

interface CartState {
  items: CartItem[];
}

// Load cart from localStorage
function loadCart(): CartItem[] {
  try {
    const savedCart = localStorage.getItem("freshcart-cart");
    return savedCart ? (JSON.parse(savedCart) as CartItem[]) : [];
  } catch {
    return [];
  }
}

const initialState: CartState = {
  items: loadCart(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }
    },

    increaseQty(state, action: PayloadAction<number>) {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQty(state, action: PayloadAction<number>) {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item) {
        item.quantity -= 1;
      }

      state.items = state.items.filter(
        (item) => item.quantity > 0
      );
    },

    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

export const selectSubtotal = (state: RootState) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

export const selectDiscount = (state: RootState) =>
  selectSubtotal(state) > 100 ? 100 : 0;

export const selectDelivery = () => 0;

export const selectGrandTotal = (state: RootState) =>
  Math.max(
    0,
    selectSubtotal(state) - selectDiscount(state)
  );  

   

// Save cart to localStorage
export const saveCartToStorage: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  if (typeof action === "object" && action !== null && "type" in action &&
      typeof action.type === "string" && action.type.startsWith("cart/")) {
    try {
      localStorage.setItem(
        "freshcart-cart",
        JSON.stringify(store.getState().cart.items)
      );
    } catch (error) {
      console.error("Unable to save cart:", error);
    }
  }

  return result;
};

export default cartSlice.reducer;
