function CartSummary() {
  return (
    <div className="cart-summary">
      <div className="summary-row"><span>Subtotal</span><span>₹517</span></div>
      <div className="summary-row"><span>Delivery</span><strong className="free-delivery">Free</strong></div>
      <div className="summary-row discount"><span>Discount</span><span>− ₹100</span></div>
      <div className="summary-row grand-total"><span>Grand total</span><span>₹417</span></div>
      <button className="checkout-btn" type="button">Checkout</button>
    </div>
  );
}

export default CartSummary;
