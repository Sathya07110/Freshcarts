import { useCart } from "../context/CartContext";

function useCartTotal() {
  const { cart } = useCart();

  const count = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const discount = subtotal > 100 ? 100 : 0;

  const delivery = 0;

  const grandTotal = Math.max(
    0,
    subtotal - discount + delivery
  );

  return {
    count,
    subtotal,
    discount,
    delivery,
    grandTotal,
  };
}

export default useCartTotal;