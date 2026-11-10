function ProductCard({ name,
   price, 
   image, 
   unit, 
   onAddToCart,
  showButton = true,
 }) {
  return (
     <article className="min-w-0 rounded-[20px] border border-[#e1e8de] bg-white p-[17px] text-center transition-[transform,border-color] duration-200 group-hover:-translate-y-[3px] group-hover:border-[#176b39] max-[600px]:rounded-[17px] max-[600px]:p-[11px]">
       <div className="mb-[14px] grid h-[clamp(125px,13vw,166px)] place-items-center overflow-hidden rounded-[15px] bg-[#f0f6e9] max-[1080px]:h-[clamp(130px,22vw,190px)] max-[600px]:mb-[10px] max-[600px]:h-auto max-[600px]:aspect-[1/0.78] max-[600px]:rounded-[13px]">
         <img className="h-auto w-auto max-h-[80%] max-w-[80%] object-contain [mix-blend-mode:multiply]"
         src={image}
         alt={name}
         
         
         />
      </div>
      <div>
        <h3 className="mb-[3px] overflow-wrap-anywhere text-[18px] font-[600] leading-[1.3] max-[600px]:text-[17px]">
          {name}
        </h3>
        <p className="m-0 text-[16px] capitalize text-[#68776c] max-[600px]:text-[14px]">
          {unit}
        </p>
        <p className="my-[13px] mb-4 text-[23px] font-extrabold max-[600px]:my-[10px] max-[600px]:mb-3 max-[600px]:text-[19px]">
          ₹{price}
        </p>
        
    {showButton && (
  <button
    className="min-h-12 w-full cursor-pointer rounded-[11px] border-0 bg-[#176b39] px-3 py-[10px] text-[17px] font-semibold text-white hover:bg-[#008035] max-[600px]:min-h-[42px] max-[600px]:rounded-[10px] max-[600px]:px-[5px] max-[600px]:py-2 max-[600px]:text-[14px]"
    type="button"
    onClick={onAddToCart}
  >
    Add to Cart
  </button>
)}

      </div>
    </article>
  );
}

export default ProductCard;
