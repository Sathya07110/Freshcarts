
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import useCartTotal from "../hooks/useCartTotal";

function Checkout() {
  const navigate = useNavigate();

  const { cart, clearCart } = useCart();

  const { subtotal, discount, grandTotal } = useCartTotal();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pinCode: "",
    paymentMethod: "",
    upiId: "",
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      navigate("/cart", { replace: true });
    }
  }, [cart.length, navigate]);

  // Validate form
  function validate(values) {
    const newErrors = {};

    const name = values.fullName.trim();
    const address = values.address.trim();
    const city = values.city.trim();

    if (name.length < 3) {
      newErrors.fullName = "Name must contain at least 3 characters";
    }

    if (!/^[6-9]\d{9}$/.test(values.phone.trim())) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (address.length < 10) {
      newErrors.address = "Address must contain at least 10 characters";
    }

    if (!city) {
      newErrors.city = "Please enter your city";
    }

    if (!/^\d{6}$/.test(values.pinCode.trim())) {
      newErrors.pinCode = "PIN code must contain exactly 6 digits";
    }

    if (!values.paymentMethod) {
      newErrors.paymentMethod = "Please select a payment method";
    }

    if (
      values.paymentMethod === "UPI" &&
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/.test(values.upiId.trim())
    ) {
      newErrors.upiId = "Enter a valid UPI ID (example: name@bank)";
    }

    return newErrors;
  }

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  // Validate when leaving a field
  function handleBlur(e) {
    const { name } = e.target;

    const updatedErrors = validate(form);

    setErrors((prev) => ({
      ...prev,
      [name]: updatedErrors[name] || "",
    }));
  }

  // Submit form
  async function handleSubmit(e) {
    e.preventDefault();

    const trimmedForm = {
      ...form,
      fullName: form.fullName.trim(),
      address: form.address.trim(),
      city: form.city.trim(),
      phone: form.phone.trim(),
      pinCode: form.pinCode.trim(),
      upiId: form.upiId.trim(),
    };

    const validationErrors = validate(trimmedForm);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (cart.length === 0) {
      navigate("/cart");
      return;
    }

    setSaving(true);

    try {
      // Simulate order processing
      await new Promise((resolve) => setTimeout(resolve, 500));

      clearCart();
      setErrors({});

      navigate("/", {
        state: { orderPlaced: true },
      });
    } finally {
      setSaving(false);
    }
  }

  if (cart.length === 0) {
    return null;
  }

  const inputClass = (field) =>
    `w-full rounded-lg border px-4 py-3 outline-none transition ${
      errors[field]
        ? "border-red-500 focus:ring-2 focus:ring-red-200"
        : "border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-100"
    }`;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">

      <div className="mb-6 text-sm text-gray-500">
        <Link to="/" className="text-green-700 hover:underline">
          Home
        </Link>
        {" › "}
        <Link to="/cart" className="text-green-700 hover:underline">
          Cart
        </Link>
        {" › "} Checkout
      </div>

      <h1 className="mb-8 text-3xl font-bold text-gray-800">
        Checkout
      </h1>

      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">

        {/* Checkout Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-xl bg-white p-6 shadow-md"
        >
          <h2 className="mb-6 text-xl font-bold text-gray-800">
            Customer Details
          </h2>

          {/* Full Name */}
          <div className="mb-4">
            <label htmlFor="fullName" className="mb-2 block font-medium">
              Full Name
            </label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass("fullName")}
            />

            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label htmlFor="phone" className="mb-2 block font-medium">
              Phone Number
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="10-digit phone number"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass("phone")}
            />

            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="mb-4">
            <label htmlFor="address" className="mb-2 block font-medium">
              Delivery Address
            </label>

            <textarea
              id="address"
              name="address"
              placeholder="Enter your full address"
              rows="3"
              value={form.address}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass("address")}
            />

            {errors.address && (
              <p className="mt-1 text-sm text-red-600">
                {errors.address}
              </p>
            )}
          </div>

          {/* City */}
          <div className="mb-4">
            <label htmlFor="city" className="mb-2 block font-medium">
              City
            </label>

            <input
              id="city"
              name="city"
              type="text"
              placeholder="Enter your city"
              value={form.city}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass("city")}
            />

            {errors.city && (
              <p className="mt-1 text-sm text-red-600">
                {errors.city}
              </p>
            )}
          </div>

          {/* PIN Code */}
          <div className="mb-4">
            <label htmlFor="pinCode" className="mb-2 block font-medium">
              PIN Code
            </label>

            <input
              id="pinCode"
              name="pinCode"
              type="text"
              inputMode="numeric"
              maxLength="6"
              placeholder="6-digit PIN code"
              value={form.pinCode}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass("pinCode")}
            />

            {errors.pinCode && (
              <p className="mt-1 text-sm text-red-600">
                {errors.pinCode}
              </p>
            )}
          </div>

          {/* Payment Method */}
          <div className="mb-4">
            <label htmlFor="paymentMethod" className="mb-2 block font-medium">
              Payment Method
            </label>

            <select
              id="paymentMethod"
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass("paymentMethod")}
            >
              <option value="">Select payment method</option>
              <option value="COD">Cash on Delivery</option>
              <option value="UPI">UPI</option>
            </select>

            {errors.paymentMethod && (
              <p className="mt-1 text-sm text-red-600">
                {errors.paymentMethod}
              </p>
            )}
          </div>

          {/* UPI ID - Bonus */}
          {form.paymentMethod === "UPI" && (
            <div className="mb-6">
              <label htmlFor="upiId" className="mb-2 block font-medium">
                UPI ID
              </label>

              <input
                id="upiId"
                name="upiId"
                type="text"
                placeholder="example@bank"
                value={form.upiId}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClass("upiId")}
              />

              {errors.upiId && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.upiId}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Placing Order..." : "Place Order"}
          </button>
        </form>

        {/* Order Summary */}
        <section className="rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-6 text-xl font-bold text-gray-800">
            Order Summary
          </h2>

          {cart.map((item) => (
            <div
              key={item.id}
              className="mb-4 flex justify-between gap-4 border-b pb-3"
            >
              <span className="text-gray-700">
                {item.title} × {item.quantity}
              </span>

              <strong>
                ₹{(item.price * item.quantity).toFixed(2)}
              </strong>
            </div>
          ))}

          <div className="flex justify-between py-2">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between py-2 text-green-700">
            <span>Discount</span>
            <span>-₹{discount.toFixed(2)}</span>
          </div>

          <div className="mt-4 flex justify-between border-t pt-4 text-lg font-bold">
            <span>Grand Total</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>
        </section>

      </div>
    </main>
  );
}

export default Checkout;
