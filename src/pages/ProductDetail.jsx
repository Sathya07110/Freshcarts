
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
      <main className="mx-auto my-[35px] min-h-[70vh] w-[calc(100%-64px)] max-w-[1600px] max-[600px]:w-[calc(100%-30px)] max-[480px]:mt-[22px]">
        <p className="rounded-xl border border-dashed border-[#cbd8c8] bg-[#f7f9f6] px-[15px] py-[35px] text-center text-[17px] text-[#68776c] before:mx-auto before:mb-3 before:block before:h-[30px] before:w-[30px] before:animate-[spin_0.8s_linear_infinite] before:rounded-full before:border-[3px] before:border-[#dce8d9] before:border-t-[#176b39] before:content-['']">
          Loading product details...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto my-[35px] min-h-[70vh] w-[calc(100%-64px)] max-w-[1600px] max-[600px]:w-[calc(100%-30px)] max-[480px]:mt-[22px]">
        <p className="rounded-xl border border-[#f0caca] bg-[#fff5f5] p-[22px] text-center text-[#a32929]">
          {error}
        </p>
        <Link to="/" className="my-[10px] inline-block font-bold text-[#176b39] no-underline">
          Back to Home
        </Link>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="mx-auto my-[35px] min-h-[70vh] w-[calc(100%-64px)] max-w-[1600px] max-[600px]:w-[calc(100%-30px)] max-[480px]:mt-[22px]">
        <p>Product not found.</p>
        <Link to="/" className="my-[10px] inline-block font-bold text-[#176b39] no-underline">
          Back to Home
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto my-[35px] min-h-[70vh] w-[calc(100%-64px)] max-w-[1600px] max-[600px]:w-[calc(100%-30px)] max-[480px]:mt-[22px]">
      <div className="mb-[25px] text-[15px] text-[#68776c]">
        <Link to="/" className="font-semibold text-[#176b39] no-underline hover:underline">
          Home
        </Link>
        {" › "} Product
      </div>

      <div className="grid grid-cols-2 items-center gap-10 rounded-[20px] border border-[#e1e8de] bg-white p-[30px] max-[768px]:grid-cols-1 max-[768px]:gap-5 max-[768px]:p-[18px]">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="max-h-[400px] w-full rounded-[15px] bg-[#f0f6e9] object-contain max-[768px]:max-h-[280px]"
        />

        <div>
          <h1 className="mt-0 text-[30px] text-[#176b39] max-[480px]:text-2xl">
            {product.title}
          </h1>

          <p className="m-0 text-[16px] capitalize text-[#68776c] max-[600px]:text-[14px]">
            {product.category}
          </p>

          <h2 className="text-[27px]">${product.price}</h2>

          <p className="leading-[1.7] text-[#68776c]">{product.description}</p>

          <p className="leading-[1.7] text-[#68776c]">
            Rating: {product.rating} / 5
          </p>

          <p className="leading-[1.7] text-[#68776c]">
            Stock: {product.stock}
          </p>

          <button
            className="my-[15px] min-h-12 w-full cursor-pointer rounded-[11px] border-0 bg-[#176b39] px-3 py-[10px] text-[17px] font-semibold text-white hover:bg-[#008035] max-[600px]:min-h-[42px] max-[600px]:rounded-[10px] max-[600px]:px-[5px] max-[600px]:py-2 max-[600px]:text-[14px]"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>

          <Link to="/cart" className="my-[10px] inline-block font-bold text-[#176b39] no-underline">
            Go to Cart
          </Link>
        </div>
      </div>
    </main>
  );
}

export default ProductDetail;
