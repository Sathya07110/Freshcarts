
import { useState, useEffect } from "react";
import {
  useParams,
  Link,
} from "react-router-dom";

import { getProductById } from "../api";
import { useCart } from "../context/CartContext";

function ProductDetail() {
  const { addToCart } = useCart();

  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setError("");
        setProduct(null);

        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="page-container">
        <p className="loading-message">
          Loading product details...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-container">
        <p className="error-message">{error}</p>
        <Link to="/">Back to Home</Link>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="page-container">
        <p>Product not found.</p>
        <Link to="/">Back to Home</Link>
      </main>
    );
  }

  return (
    <main className="page-container">
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        {" › "} Product
      </div>

      <div className="detail-card">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="detail-image"
        />

        <div className="detail-info">
          <h1>{product.title}</h1>

          <p className="product-unit">
            {product.category}
          </p>

          <h2>${product.price}</h2>

          <p>{product.description}</p>

          <p>
            Rating: {product.rating} / 5
          </p>

          <p>
            Stock: {product.stock}
          </p>

          <button
            className="add-btn"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>

          <Link to="/cart" className="secondary-link">
            Go to Cart
          </Link>
        </div>
      </div>
    </main>
  );
}

export default ProductDetail;
