
import { useState, useEffect } from "react";
import {
  Routes,
  Route,
} from "react-router-dom";

import Header from "./components/Header";

import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

import { getProducts, getGroceries } from "./api";

import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("all");
  const [retryCount, setRetryCount] = useState(0);

  // Shared cart state
  const [cartItems, setCartItems] = useState([]);

  // Fetch product list
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const data =
          category === "groceries"
            ? await getGroceries()
            : await getProducts();

        setProducts(data);
      } catch (err) {
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category, retryCount]);

  // Add to cart
  function handleAddToCart(product) {
    setCartItems((previousItems) => {
      const existingItem = previousItems.find(
        (item) => item.productId === product.id
      );

      if (existingItem) {
        return previousItems.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...previousItems,
        {
          productId: product.id,
          quantity: 1,
          product,
        },
      ];
    });
  }

  // Change quantity
  function handleQuantityChange(productId, change) {
    setCartItems((previousItems) =>
      previousItems
        .map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity: item.quantity + change,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // Remove cart item
  function handleDelete(productId) {
    setCartItems((previousItems) =>
      previousItems.filter(
        (item) => item.productId !== productId
      )
    );
  }

  // Cart total quantity
  const itemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Subtotal
  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  // Discount
  const discount = subtotal > 100 ? 100 : 0;

  // Grand total
  const grandTotal = Math.max(0, subtotal - discount);

  return (
    <>
      {/* Header appears on every page */}
      <Header itemCount={itemCount} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              products={products}
              loading={loading}
              error={error}
              category={category}
              setCategory={setCategory}
              onRetry={() =>
                setRetryCount((count) => count + 1)
              }
              onAddToCart={handleAddToCart}
            />
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProductDetail
              onAddToCart={handleAddToCart}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              onIncrease={(id) =>
                handleQuantityChange(id, 1)
              }
              onDecrease={(id) =>
                handleQuantityChange(id, -1)
              }
              onDelete={handleDelete}
              subtotal={subtotal}
              discount={discount}
              grandTotal={grandTotal}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <Checkout
              cartItems={cartItems}
              subtotal={subtotal}
              discount={discount}
              grandTotal={grandTotal}
              onPlaceOrder={() => setCartItems([])}
            />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
