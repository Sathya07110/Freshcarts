
import { useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ProductCard from "../components/ProductCard";

import {
  selectProducts,
  selectProductsStatus,
  selectProductsError,
} from "../features/products/productsSlice";

import { addToCart } from "../features/cart/cartSlice";

function Home({ category, setCategory, onRetry }) {
  const location = useLocation();
  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);

  const loading = status === "loading";

  return (
    <main className="mx-auto grid w-[calc(100%-64px)] max-w-[1600px] grid-cols-1 gap-0 px-0 pt-[34px] pb-12 max-[600px]:w-[calc(100%-30px)] max-[600px]:px-5 max-[600px]:pt-6 max-[600px]:pb-9 max-[380px]:px-[13px]">

      {location.state?.orderPlaced && (
        <p className="mb-[25px] rounded-xl border border-[#b7dfbf] bg-[#eaf8ed] p-[17px] text-[18px] font-bold text-[#176b39]">
          Order placed ✅
        </p>
      )}

      <section className="w-full min-w-0">

        <h1 className="mt-[3px] mb-6 text-[29px] leading-[1.2] tracking-[-0.5px] max-[600px]:mb-4 max-[600px]:text-[25px]">
          Fresh picks
        </h1>

        <div className="mb-[22px] flex flex-wrap items-center gap-3">

          <label
            htmlFor="category"
            className="text-[18px] font-semibold text-[#176b39]"
          >
            Choose category:
          </label>

          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="min-w-[150px] cursor-pointer rounded-[9px] border border-[#d6e1d2] bg-white px-[14px] py-[10px] text-[16px] text-[#15251a]"
          >
            <option value="all">All Products</option>
            <option value="groceries">Groceries</option>
          </select>

        </div>

        {loading && (
          <p className="mb-0 rounded-xl border border-dashed border-[#cbd8c8] bg-[#f7f9f6] px-[15px] py-[35px] text-center text-[17px] text-[#68776c]">
            Loading products...
          </p>
        )}

        {!loading && error && (
          <div className="rounded-xl border border-[#f0caca] bg-[#fff5f5] p-[22px] text-center text-[#a32929]">
            <p>{error}</p>

            <button
              className="mt-[10px] cursor-pointer rounded-lg border-0 bg-[#176b39] px-5 py-[10px] font-semibold text-white hover:bg-[#008035]"
              onClick={onRetry}
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="rounded-xl border border-dashed border-[#cbd8c8] bg-[#f7f9f6] px-[15px] py-[35px] text-center text-[17px] text-[#68776c]">
            No products found.
          </p>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 max-[600px]:grid-cols-2 max-[600px]:gap-[14px]">

            {products.map((product) => (
              <div key={product.id}>

                <Link
                  to={`/product/${product.id}`}
                  className="group block text-inherit no-underline"
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
                  className="mt-[10px] min-h-12 w-full cursor-pointer rounded-[11px] border-0 bg-[#176b39] px-3 py-[10px] text-[17px] font-semibold text-white hover:bg-[#008035] max-[600px]:min-h-[42px] max-[600px]:rounded-[10px] max-[600px]:px-[5px] max-[600px]:py-2 max-[600px]:text-[14px]"
                  onClick={() => dispatch(addToCart(product))}
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
