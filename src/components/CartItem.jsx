function CartItem({ name,
price,
quantity, 
unit,
image,
onIncrease,
onDecrease,
onDelete }) {
const itemTotal = price * quantity;

  return (
    <article className="cart-item">
      <img src={image} 
      alt={name} 
      className="cart-item-image" />

      <div className="cart-item-details">
        <h3>{name}</h3>
        <p>₹{price} / {unit}</p>
      </div>

      <div className="quantity-controls" 
      aria-label={`Quantity: ${quantity}`}
      >
        <button
         type="button" 
        onClick={onDecrease} 
        aria-label="Decrease quantity">−</button>
        <span>{quantity}</span>
        <button type="button" 
        onClick={onIncrease}
         aria-label="Increase quantity">+</button>
      </div>

      <strong className="cart-price">
        ₹{itemTotal.toFixed(2)}
       </strong>
      <button className="remove-btn" 
      type="button"
     onClick={onDelete} 
     aria-label={`Remove ${name}`}>×</button>
    </article>
  );
}

export default CartItem;
