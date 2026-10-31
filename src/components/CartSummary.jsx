


function CartSummary() {
  return (
    <div className="summary">

     

      <div className="summary-row">
        <span>Subtotal</span>
        <span>₹517</span>
      </div>

      <div className="summary-row">
        <span>Delivery</span>
        <span>Free</span>
      </div>

      <div className="summary-row discount">
        <span>Discount</span>
        <span>-₹100</span>
      </div>

      <hr />

      <div className="summary-row grand-total">
        <span>Grand Total</span>
        <span>₹417</span>
      </div>

      <button className="checkout-btn">
         Checkout
      </button>

    </div>
  );
}

export default CartSummary;
