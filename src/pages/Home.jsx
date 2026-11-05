
import { useLocation, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

function Home({
  products,
  loading,
  error,
  category,
  setCategory,
  onRetry,
}) {
  const location = useLocation();

  // Get addToCart from Context API
  const { addToCart } = useCart();

  return (
    <main className="container home-page">

      {location.state?.orderPlaced && (
        <p className="success-message">
          Order placed ✅
        </p>
      )}

      <section className="products-section">

        <h1>Fresh picks</h1>

        <div className="category-filter">
          <label htmlFor="category">
            Choose category:
          </label>

          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All Products</option>
            <option value="groceries">Groceries</option>
          </select>
        </div>

        {loading && (
          <p className="loading-message">
            Loading products...
          </p>
        )}

        {!loading && error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={onRetry}>
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="empty-products">
            No products found.
          </p>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="product-grid">

            {products.map((product) => (
              <div key={product.id}>

                <Link
                  to={`/product/${product.id}`}
                  className="product-link"
                >
                  <ProductCard
                    name={product.title}
                    price={product.price}
                    unit={product.category}
                    image={product.thumbnail}
                    showButton={false}
                  />
                </Link>

                <button
                  className="add-btn"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>

              </div>
            ))}

          </div>
        )}

      </section>

    </main>
  );
}

export default Home;
