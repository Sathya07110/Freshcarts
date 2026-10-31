
import Header from "./components/Header.jsx";
import ProductCard from "./components/ProductCard.jsx";
import CartItem from "./components/CartItem.jsx";
import CartSummary from "./components/CartSummary.jsx";

import products from "./data/products.json";

import "./App.css";

function App() {
  return (
    <div>
      {/* Header */}
      <Header />
       <main className="container">

        {/* Products Section */}
        <section className="products-section" id="products">

          <h2>Fresh picks</h2>

          <div className="product-grid">

            {products.map((product) => (
              <ProductCard
               name={product.name}
                price={product.price}
                image={product.image}
              />
            ))}

          </div>
        </section>

        {/* Shopping Cart Section */}
        <aside className="cart-section" id="cart">

          <h2>Shopping Cart (3)</h2>

          <CartItem
            name={products[0].name}
            price={products[0].price}
            quantity={2}
            image={products[0].image}
          />

          <CartItem
            name={products[3].name}
            price={products[3].price}
            quantity={1}
            image={products[3].image}
          />

          <CartItem
            name={products[5].name}
            price={products[5].price}
            quantity={2}
            image={products[5].image}
          />

          {/* Cart Summary */}
          <CartSummary />

        </aside>

      </main>
    </div>
  );
}

export default App;
