function CartItem({ name,
price,
quantity, 
unit,
image,
onIncrease,
onDecrease,
onDelete }) {
const itemTotal = price * quantity;

  return (
    <article className="grid min-w-0 grid-cols-[64px_minmax(80px,1fr)_auto_auto_16px] items-center gap-[13px] border-b border-[#e9eee7] py-[15px] first:pt-0 max-[600px]:grid-cols-[52px_minmax(60px,1fr)_auto_auto_12px] max-[600px]:gap-2 max-[600px]:py-[13px] max-[380px]:grid-cols-[44px_minmax(54px,1fr)_auto_auto_10px] max-[380px]:gap-[6px]">
      <img src={image} 
      alt={name} 
      className="h-16 w-16 rounded-[14px] bg-[#f0f6e9] object-contain [mix-blend-mode:multiply] max-[600px]:h-[52px] max-[600px]:w-[52px] max-[600px]:rounded-xl max-[380px]:h-11 max-[380px]:w-11" />

      <div className="min-w-0">
        <h3 className="mb-[3px] overflow-wrap-anywhere text-[17px] max-[600px]:text-[15px]">
          {name}
        </h3>
        <p className="m-0 text-[13px] text-[#68776c]">
          ₹{price} / {unit}
        </p>
      </div>

      <div className="flex items-center overflow-hidden rounded-[11px] border border-[#d6e1d2] bg-[#f7f9f6]" 
      aria-label={`Quantity: ${quantity}`}
      >
        <button
         className="h-[34px] w-[31px] cursor-pointer border-0 bg-transparent text-[19px] font-bold text-[#15251a] hover:text-[#176b39] max-[600px]:h-[31px] max-[600px]:w-[25px] max-[600px]:text-[17px] max-[380px]:w-[21px]"
         type="button" 
        onClick={onDecrease} 
        aria-label="Decrease quantity">−</button>
        <span className="min-w-[34px] text-center font-bold max-[600px]:min-w-[25px] max-[600px]:text-[14px] max-[380px]:min-w-[21px]">
          {quantity}
        </span>
        <button className="h-[34px] w-[31px] cursor-pointer border-0 bg-transparent text-[19px] font-bold text-[#15251a] hover:text-[#176b39] max-[600px]:h-[31px] max-[600px]:w-[25px] max-[600px]:text-[17px] max-[380px]:w-[21px]" type="button" 
        onClick={onIncrease}
         aria-label="Increase quantity">+</button>
      </div>

      <strong className="whitespace-nowrap text-[17px] max-[600px]:text-[14px]">
        ₹{itemTotal.toFixed(2)}
       </strong>
      <button className="cursor-pointer border-0 bg-transparent p-0 text-[24px] leading-none text-[#a9b5aa] hover:text-[#d62828] max-[600px]:text-[21px]" 
      type="button"
     onClick={onDelete} 
     aria-label={`Remove ${name}`}>×</button>
    </article>
  );
}

export default CartItem;
