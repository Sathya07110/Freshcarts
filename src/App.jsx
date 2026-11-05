import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

import { getProducts, getGroceries } from "./api";

import "./App.css";

function App() {
  // Products State
  const [products, setProducts] = useState([]);

  // Loading State
  const [loading, setLoading] = useState(true);

  // Error State
  const [error, setError] = useState("");

  // Category State
  const [category, setCategory] = useState("all");

  // Retry State
  const [retryCount, setRetryCount] = useState(0);

  // Fetch Products
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

  return (
    <>
      <Header />

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
            />
          }
        />

        <Route
          path="/product/:id"
          element={<ProductDetail />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </>
  );
}

export default App;