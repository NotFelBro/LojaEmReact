import { useState } from "react";
import Header from "./componentes/Header";
import Catalog from "./componentes/Catalog";
import ProductDetail from "./componentes/ProductDetail";
import CartDrawer from "./componentes/CartDrawer";
import LoginOverlay from "./componentes/LoginOverlay";
import Checkout from "./componentes/Checkout";
import "./App.css";

export default function App() {
  const [filter, setFilter] = useState("Tudo");
  const [openProduct, setOpenProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [view, setView] = useState("catalog"); // catalog | checkout
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]); // [{product, qty}]

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

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="app">
      <Header
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        onLoginClick={() => setLoginOpen(true)}
        user={user}
        onHome={() => setView("catalog")}
      />

      {view === "catalog" && (
        <Catalog onOpen={setOpenProduct} onAdd={addToCart} filter={filter} setFilter={setFilter} />
      )}

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

      <ProductDetail product={openProduct} onClose={() => setOpenProduct(null)} onAdd={addToCart} />

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
