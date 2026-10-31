

function CartItem({ name, price, quantity, image }) {
  return (
    <div className="cart-item">
      <img src={image} alt={name} className="cart-image" />

      <div className="cart-details">
        <h4>{name}</h4>
        <p>₹{price} / kg</p>
      </div>

      <div className="quantity-controls">
        <button>-</button>
        <span>{quantity}</span>
        <button>+</button>
      </div>

      <strong className="item-total">
        ₹{price * quantity}
      </strong>

      <span className="remove">×</span>
    </div>
  );
}

export default CartItem;