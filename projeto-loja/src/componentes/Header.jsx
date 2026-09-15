import {
  ShoppingBag,
  Heart,
  Search,
  X,
} from "lucide-react";

import torraLogoLight from "../assets/torra-logo-light.png";
import torraLogoDark from "../assets/torra-logo-dark.png";
import torraLogoCoffee from "../assets/torra-logo-coffee.png";

import ThemeSwitcher from "./ThemeSwitcher";

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
  theme,
  onThemeChange,
}) {
  const logos = {
    light: torraLogoLight,
    dark: torraLogoDark,
    coffee: torraLogoCoffee,
  };

  const currentLogo =
    logos[theme] ||
    torraLogoLight;

  return (
    <header className="header">

      {/* LOGO */}

      <button
        type="button"
        className="wordmark"
        onClick={onHome}
        aria-label="Torra — página inicial"
      >
        <img
          src={currentLogo}
          alt="Torra"
        />
      </button>


      {/* NAVEGAÇÃO */}

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


      {/* ÁREA DIREITA */}

      <div className="header-right">

        {/* BUSCA */}

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
              onSearchChange(
                event.target.value
              )
            }
            aria-label="Buscar produtos"
          />

          {search && (
            <button
              type="button"
              className="search-clear"
              onClick={() =>
                onSearchChange("")
              }
              aria-label="Limpar busca"
            >
              <X
                size={13}
                strokeWidth={1.8}
              />
            </button>
          )}

        </div>


        {/* TEMA */}

        <ThemeSwitcher
          theme={theme}
          onThemeChange={
            onThemeChange
          }
        />


        {/* AÇÕES */}

        <div className="header-actions">

          <button
            type="button"
            className="icon-btn"
            onClick={
              onFavoritesClick
            }
            aria-label={
              favoriteCount > 0
                ? `Favoritos — ${favoriteCount} itens`
                : "Favoritos"
            }
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
            aria-label={
              cartCount > 0
                ? `Sacola — ${cartCount} itens`
                : "Sacola"
            }
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

        </div>

      </div>

    </header>
  );
}