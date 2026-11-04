
import { NavLink } from "react-router-dom";

function Header({ itemCount }) {
  return (
    <header className="header">

      <NavLink
        to="/"
        className="logo"
      >
        Fresh<span>Cart</span>
      </NavLink>

      <nav className="nav-links">

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Cart
          <span className="badge-count">
            {itemCount}
          </span>
        </NavLink>

      </nav>

    </header>
  );
}

export default Header;
