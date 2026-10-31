function CartItem({ name, price, quantity, unit, image }) {
  const itemTotal = price * quantity;

  return (
    <article className="cart-item">
      <img src={image} alt="" className="cart-item-image" />

      <div className="cart-item-details">
        <h3>{name}</h3>
        <p>₹{price} / {unit}</p>
      </div>

      <div className="quantity-controls" aria-label={`Quantity: ${quantity}`}>
        <button type="button" aria-label="Decrease quantity">−</button>
        <span>{quantity}</span>
        <button type="button" aria-label="Increase quantity">+</button>
      </div>

      <strong className="cart-price">₹{itemTotal}</strong>
      <button className="remove-btn" type="button" aria-label={`Remove ${name}`}>×</button>
    </article>
  );
}

export default CartItem;
