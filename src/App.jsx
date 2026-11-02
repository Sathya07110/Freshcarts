import { useState } from "react";

import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import CartItem from "./components/CartItem";
import CartSummary from "./components/CartSummary";

import products from "./data.js";

import "./App.css";

function App() {
  //Cart state
  const [cartItems, setCartItems] = useState([
    { productId: 1, quantity: 1 },
    { productId: 3, quantity: 1 },
    { productId: 6, quantity: 1 },
  ]);
  // const [cartItems, setCartItems] = useState([]);

  // Add product to cart
  function handleAddToCart(productId) {
    const existingItem = cartItems.find(
      (item) => item.productId === productId
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        { productId: productId, quantity: 1 },
      ]);
    }
  }

  // Increase or decrease quantity
  function handleQuantityChange(productId, change) {
    setCartItems(
      cartItems
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // Remove product
  function handleDelete(productId) {
    setCartItems(
      cartItems.filter((item) => item.productId !== productId)
    );
  }

  // Get product details for cart
  const cartWithProducts = cartItems.map((item) => ({
    ...item,
    product: products.find(
      (product) => product.id === item.productId
    ),
  }));

  // Total quantity
  const itemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Subtotal
  const subtotal = cartWithProducts.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  // Discount
  const discount = subtotal > 0 ? 100 : 0;

  // Grand total
  const grandTotal = subtotal - discount;

  return (
    <>
      <Header itemCount={itemCount} />

      <main className="container">

        {/* Products Section */}
        <section className="products-section" id="products">

          <h1>Fresh picks</h1>

          <div className="product-grid">

            {products.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                unit={product.unit}
                image={product.image}
                onAddToCart={() =>
                  handleAddToCart(product.id)
                }
              />
            ))}

          </div>
        </section>

        {/* Cart Section */}
        <aside className="cart-section">

          <h2>Your cart ({itemCount} items)</h2>

          {cartWithProducts.length === 0 ? (
            <p className="empty-cart">
              Your cart is empty
            </p>
          ) : (
            <div className="cart-items">

              {cartWithProducts.map((item) => (
                <CartItem
                  key={item.product.id}
                  name={item.product.name}
                  price={item.product.price}
                  quantity={item.quantity}
                  unit={item.product.unit}
                  image={item.product.image}
                  onIncrease={() =>
                    handleQuantityChange(
                      item.product.id,
                      1
                    )
                  }
                  onDecrease={() =>
                    handleQuantityChange(
                      item.product.id,
                      -1
                    )
                  }
                  onDelete={() =>
                    handleDelete(item.product.id)
                  }
                />
              ))}

            </div>
          )}

          {/* Cart Summary */}
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