
import { useState, useEffect } from "react";

import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import CartItem from "./components/CartItem";
import CartSummary from "./components/CartSummary";

import { getProducts, getGroceries } from "./api";

import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [category, setCategory] = useState("all");

  const [retryCount, setRetryCount] = useState(0);

  const [cartItems, setCartItems] = useState([]);

  // Fetch products from API
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        let fetchedProducts;

        if (category === "groceries") {
          fetchedProducts = await getGroceries();
        } else {
          fetchedProducts = await getProducts();
        }

        setProducts(fetchedProducts);
      } catch (err) {
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category, retryCount]);

  // Add product to cart
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

  // Increase and decrease quantity
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

  // Remove product
  function handleDelete(productId) {
    setCartItems((previousItems) =>
      previousItems.filter(
        (item) => item.productId !== productId
      )
    );
  }
  
  // Total cart quantity
const itemCount = cartItems.reduce(
  (total, item) => total + item.quantity,
  0
);

// Calculate subtotal
const subtotal = cartItems.reduce(
  (total, item) =>
    total + item.product.price * item.quantity,
  0
);

// Discount
const discount = subtotal >= 100 ? 100 : 0;

// Grand total
const grandTotal = subtotal - discount;


  return (
    <>
      <Header itemCount={itemCount} />

      <main className="container">

        {/* Products Section */}
        <section className="products-section" id="products">

          <h1>Fresh picks</h1>

          <div className="category-filter">
            <label htmlFor="category">
              Choose category:
            </label>

            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All Products</option>
              <option value="groceries">Groceries</option>
            </select>
          </div>

          {/* Loading State */}
          {loading && (
            <p className="loading-message">
              Loading products...
            </p>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="error-message">
              <p>{error}</p>

              <button
                type="button"
                onClick={() =>
                  setRetryCount((count) => count + 1)
                }
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && products.length === 0 && (
            <p className="empty-products">
              No products found.
            </p>
          )}

          {/* Product Cards */}
          {!loading && !error && products.length > 0 && (
            <div className="product-grid">

              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.title}
                  price={product.price}
                  unit={product.category}
                  image={product.thumbnail}
                  onAddToCart={() =>
                    handleAddToCart(product)
                  }
                />
              ))}

            </div>
          )}

        </section>

        {/* Cart Section */}
        <aside className="cart-section">

          <h2>Your cart ({itemCount} items)</h2>

          {cartItems.length === 0 ? (
            <p className="empty-cart">
              Your cart is empty
            </p>
          ) : (
            <div className="cart-items">

              {cartItems.map((item) => (
                <CartItem
                  key={item.productId}
                  name={item.product.title}
                  price={item.product.price}
                  quantity={item.quantity}
                  unit={item.product.category}
                  image={item.product.thumbnail}
                  onIncrease={() =>
                    handleQuantityChange(item.productId, 1)
                  }
                  onDecrease={() =>
                    handleQuantityChange(item.productId, -1)
                  }
                  onDelete={() =>
                    handleDelete(item.productId)
                  }
                />
              ))}

            </div>
          )}

          <CartSummary
            subtotal={subtotal}
            discount={discount}
            grandTotal={grandTotal}
            isCartEmpty={cartItems.length === 0}
          />

        </aside>

      </main>
    </>
  );
}

export default App;
