function Header({ itemCount }) {
  return (
    <header className="header">
      <a className="logo" 
      href="#products" 
      aria-label="FreshCart home">
        Fresh<span>Cart</span>
      </a>
      <div className="cart-badge"
       aria-label={`${itemCount} items in cart`}>
        <span className="cart-icon" aria-hidden="true">🛒</span>
        <span className="badge-count">{itemCount}</span>
      </div>
    </header>
  );
}

export default Header;
