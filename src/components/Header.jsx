import { NavLink } from "react-router-dom";
import useCartTotal from "../hooks/useCartTotal";

function Header() {
  const { count } = useCartTotal();

  return (
    <header className="header">
      <NavLink to="/" className="logo">
        Fresh<span>Cart</span>
      </NavLink>

      <nav className="nav-links">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>

        <NavLink to="/cart" className="nav-link">
          Cart
          <span className="badge-count">
            {count}
          </span>
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;