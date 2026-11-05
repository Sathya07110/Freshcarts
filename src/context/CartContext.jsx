import {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";

import useLocalStorage from "../hooks/useLocalStorage";

const CartContext = createContext(null);

// Cart reducer
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const existingItem = state.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...state,
        { ...action.payload, quantity: 1 },
      ];
    }

    case "INCREASE":
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case "DECREASE":
      return state
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

    case "REMOVE":
      return state.filter(
        (item) => item.id !== action.payload
      );

    case "CLEAR":
      return [];

    default:
      return state;
  }
}

// Provider
export function CartProvider({ children }) {
  const [savedCart, setSavedCart] = useLocalStorage(
    "freshcart-cart",
    []
  );

  const [cart, dispatch] = useReducer(
    cartReducer,
    savedCart
  );

  // Save cart whenever it changes
  useEffect(() => {
    setSavedCart(cart);
  }, [cart, setSavedCart]);

  function addToCart(product) {
    dispatch({ type: "ADD", payload: product });
  }

  function increaseQuantity(id) {
    dispatch({ type: "INCREASE", payload: id });
  }

  function decreaseQuantity(id) {
    dispatch({ type: "DECREASE", payload: id });
  }

  function removeFromCart(id) {
    dispatch({ type: "REMOVE", payload: id });
  }

  function clearCart() {
    dispatch({ type: "CLEAR" });
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom context hook
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}