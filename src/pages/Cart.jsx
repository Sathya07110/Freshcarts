
import { Link, useNavigate } from "react-router-dom";

import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";

import { useCart } from "../context/CartContext";
import useCartTotal from "../hooks/useCartTotal";

function Cart() {
  const navigate = useNavigate();

  // Get cart data and functions from Context
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  // Get cart total values from custom hook
  const {
    count,
    subtotal,
    discount,
    grandTotal,
  } = useCartTotal();

  return (
    <main className="page-container">

      <div className="breadcrumb">
        <Link to="/">Home</Link>
        {" › "} Cart
      </div>

      <h1>Your Shopping Cart ({count} items)</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>

          <Link to="/" className="secondary-link">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-page-layout">

          <section className="cart-list">

            {cart.map((item) => (
              <CartItem
                key={item.id}
                name={item.title}
                price={item.price}
                quantity={item.quantity}
                unit={item.category}
                image={item.thumbnail}
                onIncrease={() => increaseQuantity(item.id)}
                onDecrease={() => decreaseQuantity(item.id)}
                onDelete={() => removeFromCart(item.id)}
              />
            ))}

          </section>

          <aside className="cart-section">

            <h2>Order Summary</h2>

            <CartSummary
              subtotal={subtotal}
              discount={discount}
              grandTotal={grandTotal}
              isCartEmpty={false}
              onCheckout={() => navigate("/checkout")}
            />

          </aside>

        </div>
      )}

    </main>
  );
}

export default Cart;
