import {
  ShoppingBag,
  Heart,
  Search,
  X,
} from "lucide-react";
import torraLogo from "../assets/torra-logo.png";

export default function Header({
  cartCount,
  favoriteCount,
  onCartClick,
  onFavoritesClick,
  onProdutosClick,
  onSobreClick,
  onHome,
  search,
  onSearchChange,
}) {
  return (
    <header className="header">
      <button
        type="button"
        className="wordmark"
        onClick={onHome}
        aria-label="Ir para o início"
      >
        <img
          src={torraLogo}
          alt="Torra"
        />
      </button>

      <nav className="nav-links">
        <button
          type="button"
          className="nav-link"
          onClick={onProdutosClick}
        >
          Produtos
        </button>

        <button
          type="button"
          className="nav-link"
          onClick={onFavoritesClick}
        >
          Favoritos
        </button>

        <button
          type="button"
          className="nav-link"
          onClick={onSobreClick}
        >
          Sobre
        </button>
      </nav>

      <div className="header-right">
        <div className="search-box">
          <Search
            size={15}
            strokeWidth={1.8}
          />

          <input
            type="text"
            placeholder="Buscar produtos"
            value={search}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            aria-label="Buscar produtos"
          />

          {search && (
            <button
              type="button"
              className="search-clear"
              onClick={() => onSearchChange("")}
              aria-label="Limpar busca"
            >
              <X size={13} />
            </button>
          )}
        </div>

        <nav className="header-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={onFavoritesClick}
            aria-label={`Favoritos${
              favoriteCount > 0
                ? `, ${favoriteCount} itens`
                : ""
            }`}
          >
            <Heart
              size={18}
              strokeWidth={1.6}
            />

            {favoriteCount > 0 && (
              <span className="cart-badge">
                {favoriteCount}
              </span>
            )}
          </button>

          <button
            type="button"
            className="icon-btn"
            onClick={onCartClick}
            aria-label={`Sacola${
              cartCount > 0
                ? `, ${cartCount} itens`
                : ""
            }`}
          >
            <ShoppingBag
              size={18}
              strokeWidth={1.6}
            />

            <span className="icon-btn-label">
              Sacola
            </span>

            {cartCount > 0 && (
              <span className="cart-badge">
                {cartCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}