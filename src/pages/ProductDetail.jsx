
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProductById,
  clearSelectedProduct,
  selectSelectedProduct,
  selectProductDetailStatus,
  selectProductDetailError,
} from "../features/products/productsSlice";

import { addToCart } from "../features/cart/cartSlice";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector(selectSelectedProduct);
  const status = useSelector(selectProductDetailStatus);
  const error = useSelector(selectProductDetailError);

  useEffect(() => {
    dispatch(fetchProductById(id));

    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  if (status === "idle" || status === "loading") {
    return (
      <main className="mx-auto my-[35px] min-h-[70vh] w-[calc(100%-64px)] max-w-[1600px]">
        <p className="rounded-xl border border-dashed border-[#cbd8c8] bg-[#f7f9f6] px-[15px] py-[35px] text-center text-[17px] text-[#68776c]">
          Loading product details...
        </p>
      </main>
    );
  }

  if (status === "failed") {
    return (
      <main className="mx-auto my-[35px] min-h-[70vh] w-[calc(100%-64px)] max-w-[1600px]">
        <p className="rounded-xl border border-[#f0caca] bg-[#fff5f5] p-[22px] text-center text-[#a32929]">
          {error}
        </p>

        <Link to="/" className="my-[10px] inline-block font-bold text-[#176b39]">
          Back to Home
        </Link>
      </main>
    );
  }

  if (!product) {
    return <p>Product not found.</p>;
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

          <p className="m-0 text-[16px] capitalize text-[#68776c]">
            {product.category}
          </p>

          <h2 className="text-[27px]">₹{product.price}</h2>

          <p className="leading-[1.7] text-[#68776c]">
            {product.description}
          </p>

          <p className="leading-[1.7] text-[#68776c]">
            Rating: {product.rating} / 5
          </p>

          <p className="leading-[1.7] text-[#68776c]">
            Stock: {product.stock}
          </p>

          <button
            className="my-[15px] min-h-12 w-full cursor-pointer rounded-[11px] border-0 bg-[#176b39] px-3 py-[10px] text-[17px] font-semibold text-white hover:bg-[#008035]"
            onClick={() => dispatch(addToCart(product))}
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
