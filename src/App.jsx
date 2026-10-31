import Header from "./components/Header.jsx";
import ProductCard from "./components/ProductCard.jsx";
import CartItem from "./components/CartItem.jsx";
import CartSummary from "./components/CartSummary.jsx";
import productData from "./data/products.json";
import "./App.css";

// Product data now comes from products.json.
const products = productData;

/*
Previous product list, kept here as a comment for reference:

const products = [
  { name: "Apples", price: 180, unit: "1 kg", image: productData[0].image },
  { name: "Bananas", price: 60, unit: "1 dozen", image: productData[1].image },
  { name: "Carrots", price: 40, unit: "500 g", image: productData[2].image },
  { name: "Tomatoes", price: 35, unit: "1 kg", image: productData[3].image },
  { name: "Milk", price: 56, unit: "1 litre", image: productData[4].image },
  { name: "Bread", price: 45, unit: "400 g", image: productData[5].image },
];
*/

// Keep the same sample cart: 2 apples, 2 milk, and 1 bread.
const cartItems = [
  { product: products[0], quantity: 2, unit: "kg" },
  { product: products[4], quantity: 2, unit: "litre" },
  { product: products[5], quantity: 1, unit: "each" },
];

/*
Previous cart list, kept here as a comment for reference:

const cartItems = [
  { name: "Apples", price: 180, quantity: 2, unit: "kg", image: products[0].image },
  { name: "Milk", price: 56, quantity: 2, unit: "litre", image: products[4].image },
  { name: "Bread", price: 45, quantity: 1, unit: "each", image: products[5].image },
];
*/

function App() {
  return (
    <>
      <Header itemCount={5} />

      <main className="container">
        <section className="products-section">
          <h1>Fresh picks</h1>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                unit={product.unit}
                image={product.image}
              />
            ))}
          </div>
        </section>

        <aside className="cart-section">
          <h2>Your cart (3 items)</h2>
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem
                key={item.product.id}
                name={item.product.name}
                price={item.product.price}
                quantity={item.quantity}
                unit={item.unit}
                image={item.product.image}
              />
            ))}
          </div>
          <CartSummary />
        </aside>
      </main>
    </>
  );
}

export default App;
