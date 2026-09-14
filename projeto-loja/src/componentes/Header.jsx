import { ShoppingBag, User } from "lucide-react";

export default function Header({ cartCount, onCartClick, onLoginClick, user, onHome }) {
  return (
    <header className="header">
      <button className="wordmark" onClick={onHome}>Torra</button>
      <nav className="header-actions">
        <button className="icon-btn" onClick={onLoginClick}>
          <User size={18} strokeWidth={1.6} />
          <span className="icon-btn-label">{user ? user.name.split(" ")[0] : "Entrar"}</span>
        </button>
        <button className="icon-btn" onClick={onCartClick}>
          <ShoppingBag size={18} strokeWidth={1.6} />
          <span className="icon-btn-label">Sacola</span>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </nav>
    </header>
  );
}
