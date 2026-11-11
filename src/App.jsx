import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Header from "./components/Header";

import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

import { fetchProducts } from "./features/products/productsSlice";

function App() {
  const dispatch = useDispatch();

  const [category, setCategory] = useState("all");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts(category));
  }, [dispatch, category, retryCount]);

  return (
    <div className="font-[Poppins,sans-serif]">
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              category={category}
              setCategory={setCategory}
              onRetry={() =>
                setRetryCount((count) => count + 1)
              }
            />
          }
        />

        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
