function CartSummary({
  subtotal,
  discount,
  grandTotal,
  isCartEmpty,
  onCheckout,
}) {
  return (
    <div className="pt-[18px]">

      <div className="mb-[13px] flex justify-between gap-3 text-[16px] max-[600px]:mb-[11px] max-[600px]:text-[15px]">
        <span>Subtotal</span>
        <span>₹{subtotal}</span>
      </div>

      <div className="mb-[13px] flex justify-between gap-3 text-[16px] max-[600px]:mb-[11px] max-[600px]:text-[15px]">
        <span>Delivery</span>

        <strong className="text-[#176b39]">
          Free
        </strong>
      </div>

      <div className="mb-[13px] flex justify-between gap-3 text-[16px] max-[600px]:mb-[11px] max-[600px]:text-[15px]">
        <span>Discount</span>
        <span className="text-[red]">
          -₹{discount.toFixed(2)}</span>
      </div>

      <div className="mt-4 mb-0 flex justify-between gap-3 border-t border-dashed border-[#cbd8c8] pt-[17px] text-[23px] font-extrabold max-[600px]:text-xl">
        <span>Grand total</span>
        <span>₹{grandTotal.toFixed(2)}</span>
      </div>

      <button
        className="mt-[21px] min-h-[60px] w-full cursor-pointer rounded-[13px] border-0 bg-[#82ce10] text-[21px] font-extrabold text-[#14251a] disabled:cursor-not-allowed disabled:bg-[#d8dfd5] disabled:text-[#879187] max-[600px]:min-h-[54px] max-[600px]:text-[19px]"
        type="button"
        disabled={isCartEmpty}
        onClick={onCheckout}
      >
        Checkout
      </button>

    </div>
  );
}

export default CartSummary;