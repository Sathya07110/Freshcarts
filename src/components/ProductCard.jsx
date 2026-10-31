


function ProductCard({ name, price, image, category }) {
  return (

    
    <div className="product-card">


   <img src={image} alt={name} />

      <div className="product-info">

        <p className="category">{category}</p>

        <h3>{name}</h3>

        <h4>₹{price}</h4>

        <button className="add-btn">
          Add to Cart
        </button>

      </div>
    </div>
  );
}

export default ProductCard;
