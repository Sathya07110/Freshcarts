
import { Link, useNavigate } from "react-router-dom";

import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";

function Cart({
  cartItems,
  onIncrease,
  onDecrease,
  onDelete,
  subtotal,
  discount,
  grandTotal,
}) {
  const navigate = useNavigate();

  return (
    <main className="page-container">

      <div className="breadcrumb">
        <Link to="/">Home</Link>
        {" › "} Cart
      </div>

      <h1>Your Shopping Cart ({cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      )} items)</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <Link to="/" className="secondary-link">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-page-layout">

          <section className="cart-list">

            {cartItems.map((item) => (
              <CartItem
                key={item.productId}
                name={item.product.title}
                price={item.product.price}
                quantity={item.quantity}
                unit={item.product.category}
                image={item.product.thumbnail}
                onIncrease={() => onIncrease(item.productId)}
                onDecrease={() => onDecrease(item.productId)}
                onDelete={() => onDelete(item.productId)}
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
