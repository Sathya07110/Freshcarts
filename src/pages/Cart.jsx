
import { Link, useNavigate } from "react-router-dom";

import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";

import { useCart } from "../context/CartContext";
import useCartTotal from "../hooks/useCartTotal";

function Cart() {
  const navigate = useNavigate();

  // Get cart data and functions from Context
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  // Get cart total values from custom hook
  const {
    count,
    subtotal,
    discount,
    grandTotal,
  } = useCartTotal();

  return (
    <main className="mx-auto my-[35px] min-h-[70vh] w-[calc(100%-64px)] max-w-[1600px] max-[600px]:w-[calc(100%-30px)] max-[480px]:mt-[22px]">

      <div className="mb-[25px] text-[15px] text-[#68776c]">
        <Link to="/" className="font-semibold text-[#176b39] no-underline hover:underline">
          Home
        </Link>
        {" › "} Cart
      </div>

      <h1 className="mb-[25px] text-[#176b39]">
        Your Shopping Cart ({count} items)
      </h1>

      {cart.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#cbd8c8] bg-[#f7f9f6] px-3 py-7 text-center text-[#68776c]">
          <h2>Your cart is empty</h2>

          <Link to="/" className="my-[10px] inline-block font-bold text-[#176b39] no-underline">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-[minmax(0,1.5fr)_minmax(300px,0.8fr)] items-start gap-[30px] max-[768px]:grid-cols-1">

          <section className="rounded-[18px] border border-[#e1e8de] bg-white p-5 max-[480px]:p-3">

            {cart.map((item) => (
              <CartItem
                key={item.id}
                name={item.title}
                price={item.price}
                quantity={item.quantity}
                unit={item.category}
                image={item.thumbnail}
                onIncrease={() => increaseQuantity(item.id)}
                onDecrease={() => decreaseQuantity(item.id)}
                onDelete={() => removeFromCart(item.id)}
              />
            ))}

          </section>

          <aside className="sticky top-5 rounded-[22px] border border-[#e1e8de] bg-white p-6 max-[768px]:static max-[600px]:rounded-[18px] max-[600px]:px-[15px] max-[600px]:py-[18px] max-[380px]:px-[11px]">

            <h2 className="mb-[22px] text-[25px] leading-[1.25] tracking-[-0.4px] max-[600px]:mb-3 max-[600px]:text-[21px]">
              Order Summary
            </h2>

            <CartSummary
              subtotal={subtotal}
              discount={discount}
              grandTotal={grandTotal}
              isCartEmpty={false}
              onCheckout={() => navigate("/checkout")}
            />

          </aside>

        </div>
      )}

    </main>
  );
}

export default Cart;
