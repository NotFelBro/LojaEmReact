import { useState } from "react";
import Header from "./componentes/Header";
import Catalog from "./componentes/Catalog";
import ProductDetail from "./componentes/ProductDetail";
import CartDrawer from "./componentes/CartDrawer";
import LoginOverlay from "./componentes/LoginOverlay";
import Checkout from "./componentes/Checkout";
import FavoritesPage from "./componentes/FavoritesPage";
import About from "./componentes/About";
import "./App.css";

export default function App() {
  const [filter, setFilter] = useState("Tudo");
  const [search, setSearch] = useState("");
  const [openProduct, setOpenProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [view, setView] = useState("catalog"); // catalog | checkout | favorites | about
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]); // [{product, qty}]
  const [favorites, setFavorites] = useState([]); // [productId]

  function addToCart(product, qty) {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) => (i.product.id === product.id ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { product, qty }];
    });
    setCartOpen(true);
  }

  function setQty(id, qty) {
    setCart((prev) => prev.map((i) => (i.product.id === id ? { ...i, qty } : i)));
  }

  function removeItem(id) {
    setCart((prev) => prev.filter((i) => i.product.id !== id));
  }

  function toggleFavorite(id) {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  }

  function goToProdutos() {
    setView("catalog");
    requestAnimationFrame(() => {
      document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="app">
      <Header
        cartCount={cartCount}
        favoriteCount={favorites.length}
        onCartClick={() => setCartOpen(true)}
        onLoginClick={() => setLoginOpen(true)}
        onFavoritesClick={() => setView("favorites")}
        onProdutosClick={goToProdutos}
        onSobreClick={() => setView("about")}
        user={user}
        onHome={() => setView("catalog")}
        search={search}
        onSearchChange={(v) => {
          setSearch(v);
          if (view !== "catalog") setView("catalog");
        }}
      />

      {view === "catalog" && (
        <Catalog
          onOpen={setOpenProduct}
          onAdd={addToCart}
          filter={filter}
          setFilter={setFilter}
          search={search}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      )}

      {view === "favorites" && (
        <FavoritesPage
          favorites={favorites}
          onOpen={setOpenProduct}
          onAdd={addToCart}
          onToggleFavorite={toggleFavorite}
          onBrowse={goToProdutos}
        />
      )}

      {view === "about" && <About />}

      {view === "checkout" && (
        <Checkout
          items={cart}
          onBack={() => {
            setView("catalog");
            setCartOpen(true);
          }}
          onDone={() => {
            setCart([]);
            setView("catalog");
          }}
        />
      )}

      <ProductDetail
        product={openProduct}
        onClose={() => setOpenProduct(null)}
        onAdd={addToCart}
        isFavorite={openProduct ? favorites.includes(openProduct.id) : false}
        onToggleFavorite={toggleFavorite}
      />

      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onQty={setQty}
        onRemove={removeItem}
        onCheckout={() => {
          setCartOpen(false);
          setView("checkout");
        }}
      />

      <LoginOverlay
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        user={user}
        onLogin={(u) => {
          setUser(u);
          setLoginOpen(false);
        }}
        onLogout={() => setUser(null)}
      />
    </div>
  );
}
