import { NavLink } from "react-router-dom";
import useCartTotal from "../hooks/useCartTotal";

function Header() {
  const { count } = useCartTotal();

  return (
    <header className="flex h-[66px] items-center justify-between border-b border-[#e1e8de] bg-white px-8 max-[600px]:h-[62px] max-[600px]:px-5 max-[480px]:px-[15px]">
      <NavLink
        to="/"
        className="text-[30px] font-extrabold leading-none tracking-[-1.2px] text-[#176b39] no-underline max-[600px]:text-[25px]"
      >
        Fresh<span className="text-[#80ce12]">Cart</span>
      </NavLink>

      <nav className="flex items-center gap-[25px] max-[768px]:gap-[15px] max-[480px]:gap-3">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 text-[16px] font-semibold no-underline hover:text-[#176b39] max-[480px]:text-[14px] ${
              isActive ? "text-[#176b39]" : "text-[#526052]"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `flex items-center gap-2 text-[16px] font-semibold no-underline hover:text-[#176b39] max-[480px]:text-[14px] ${
              isActive ? "text-[#176b39]" : "text-[#526052]"
            }`
          }
        >
          Cart
          <span className="grid h-[25px] w-[25px] place-items-center rounded-full bg-[#176b39] text-[13px] text-white">
            {count}
          </span>
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;