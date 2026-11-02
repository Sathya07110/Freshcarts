function CartSummary({
  subtotal,
  discount,
  grandTotal,
  isCartEmpty,
}) {
  return (
    <div className="cart-summary">

      <div className="summary-row">
        <span>Subtotal</span>
        <span>₹{subtotal}</span>
      </div>

      <div className="summary-row">
        <span>Delivery</span>

        <strong className="free-delivery">
          Free
        </strong>
      </div>

      <div className="summary-row discount">
        <span>Discount</span>
        <span className="discount-amount">-₹{discount}</span>
      </div>

      <div className="summary-row grand-total">
        <span>Grand total</span>
        <span>₹{grandTotal}</span>
      </div>

      <button
        className="checkout-btn"
        type="button"
        disabled={isCartEmpty}
      >
        Checkout
      </button>

    </div>
  );
}

export default CartSummary;