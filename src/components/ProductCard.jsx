function ProductCard({ name,
   price, 
   image, 
   unit, 
   onAddToCart,
  showButton = true,
 }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img className="product-image"
         src={image}
         alt={name}
         
         
         />
      </div>
      <div className="product-info">
        <h3>{name}</h3>
        <p className="product-unit">{unit}</p>
        <p className="product-price">₹{price}</p>

        {showButton && (
          <button
          className="add-btn"
          type="button"
          onClick={onAddToCart}
        >
          Add to Cart 
        </button>
        )}
      </div>
    </article>
  );
}

export default ProductCard;
