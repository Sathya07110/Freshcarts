
import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage
function loadCart() {
  try {
    const savedCart = localStorage.getItem("freshcart-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
}

const initialState = {
  items: loadCart(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart(state, action) {
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

    increaseQty(state, action) {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQty(state, action) {
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

    removeFromCart(state, action) {
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
export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

export const selectSubtotal = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

export const selectDiscount = (state) =>
  selectSubtotal(state) > 100 ? 100 : 0;

export const selectDelivery = () => 0;

export const selectGrandTotal = (state) =>
  Math.max(
    0,
    selectSubtotal(state) - selectDiscount(state)
  );  

   

// Save cart to localStorage
export const saveCartToStorage = (store) => (next) => (action) => {
  const result = next(action);

  if (action.type.startsWith("cart/")) {
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
