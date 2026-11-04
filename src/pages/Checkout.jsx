 
import { useState, useEffect } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

function Checkout({
  cartItems,
  subtotal,
  discount,
  grandTotal,
  onPlaceOrder,
}) {
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");

  // Redirect when cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart", { replace: true });
    }
  }, [cartItems.length, navigate]);

  // Place order
  function handleSubmit(e) {
    e.preventDefault();

    if (cartItems.length === 0) {
      navigate("/cart");
      return;
    }

    onPlaceOrder();

    navigate("/", {
      state: { orderPlaced: true },
    });
  }

  if (cartItems.length === 0) {
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

          {cartItems.map((item) => (
            <div
              className="order-item"
              key={item.productId}
            >
              <span>
                {item.product.title} × {item.quantity}
              </span>

              <strong>
                ₹{(
                  item.product.price * item.quantity
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
    