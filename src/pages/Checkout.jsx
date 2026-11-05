
import { useState, useEffect } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useCart } from "../context/CartContext";
import useCartTotal from "../hooks/useCartTotal";

function Checkout() {
  const navigate = useNavigate();

  // Get cart data and clearCart from Context
  const { cart, clearCart } = useCart();

  // Get total values from custom hook
  const {
    subtotal,
    discount,
    grandTotal,
  } = useCartTotal();

  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");

  // Redirect when cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      navigate("/cart", { replace: true });
    }
  }, [cart.length, navigate]);

  // Place order
  function handleSubmit(e) {
    e.preventDefault();

    if (cart.length === 0) {
      navigate("/cart");
      return;
    }

    // Clear cart using Context
    clearCart();

    navigate("/", {
      state: { orderPlaced: true },
    });
  }

  if (cart.length === 0) {
    return null;
  }

  return (
    <main className="page-container">

      <div className="breadcrumb">
        <Link to="/">Home</Link>
        {" › "}
        <Link to="/cart">Cart</Link>
        {" › "} Checkout
      </div>

      <h1>Checkout</h1>

      <div className="checkout-layout">

        <form
          className="checkout-form"
          onSubmit={handleSubmit}
        >

          <h2>Customer Details</h2>

          <label htmlFor="customerName">
            Full Name
          </label>

          <input
            id="customerName"
            type="text"
            placeholder="Enter your name"
            value={customerName}
            onChange={(e) =>
              setCustomerName(e.target.value)
            }
            required
          />

          <label htmlFor="address">
            Delivery Address
          </label>

          <textarea
            id="address"
            placeholder="Enter your delivery address"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
            required
          />

          <button
            type="submit"
            className="checkout-btn"
          >
            Place Order
          </button>

        </form>

        <section className="order-summary">

          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div
              className="order-item"
              key={item.id}
            >
              <span>
                {item.title} × {item.quantity}
              </span>

              <strong>
                ₹{(
                  item.price * item.quantity
                ).toFixed(2)}
              </strong>
            </div>
          ))}

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Discount</span>
            <span>-₹{discount.toFixed(2)}</span>
          </div>

          <div className="summary-row grand-total">
            <span>Grand Total</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>

        </section>

      </div>

    </main>
  );
}

export default Checkout;
