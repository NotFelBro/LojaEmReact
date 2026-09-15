import {
  useEffect,
  useState,
} from "react";

import Header from "./componentes/Header";
import PromoCarousel from "./componentes/PromoCarousel";
import Catalog from "./componentes/Catalog";
import ProductDetail from "./componentes/ProductDetail";
import CartDrawer from "./componentes/CartDrawer";
import Checkout from "./componentes/Checkout";
import FavoritesPage from "./componentes/FavoritesPage";
import About from "./componentes/About";
import Footer from "./componentes/Footer";

import "./App.css";
import "./componentes/Theme.css";

export default function App() {
  const [filter, setFilter] =
    useState("Tudo");

  const [search, setSearch] =
    useState("");

  const [openProduct, setOpenProduct] =
    useState(null);

  const [cartOpen, setCartOpen] =
    useState(false);

  const [view, setView] =
    useState("catalog");

  const [cart, setCart] =
    useState([]);

  const [favorites, setFavorites] =
    useState([]);


  /* =====================================================
     TEMA
     ===================================================== */

  // O projeto sempre inicia no modo Light
  const [theme, setTheme] =
    useState("light");


  useEffect(() => {
    document.documentElement.dataset.theme =
      theme;

    try {
      localStorage.setItem(
        "torra-theme",
        theme
      );
    } catch {
      // Ignora erro de localStorage.
    }
  }, [theme]);


  /* =====================================================
     CARRINHO
     ===================================================== */

  function addToCart(product, qty) {
    setCart((prev) => {
      const existing =
        prev.find(
          (item) =>
            item.product.id ===
            product.id
        );

      if (existing) {
        return prev.map(
          (item) =>
            item.product.id ===
            product.id
              ? {
                  ...item,
                  qty:
                    item.qty + qty,
                }
              : item
        );
      }

      return [
        ...prev,
        {
          product,
          qty,
        },
      ];
    });

    setCartOpen(true);
  }


  function setQty(id, qty) {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === id
          ? {
              ...item,
              qty,
            }
          : item
      )
    );
  }


  function removeItem(id) {
    setCart((prev) =>
      prev.filter(
        (item) =>
          item.product.id !== id
      )
    );
  }


  /* =====================================================
     FAVORITOS
     ===================================================== */

  function toggleFavorite(id) {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter(
            (favoriteId) =>
              favoriteId !== id
          )
        : [
            ...prev,
            id,
          ]
    );
  }


  /* =====================================================
     NAVEGAÇÃO
     ===================================================== */

  function goToProdutos() {
    setView("catalog");

    // Volta para todos os produtos
    setFilter("Tudo");

    requestAnimationFrame(() => {
      document
        .getElementById("produtos")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    });
  }


  /* =====================================================
     NAVEGAÇÃO POR CATEGORIA
     ===================================================== */

  function goToCategoria(category) {
    setView("catalog");

    // Define a categoria escolhida
    setFilter(category);

    requestAnimationFrame(() => {
      document
        .getElementById("produtos")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    });
  }


  /* =====================================================
     CONTADOR DA SACOLA
     ===================================================== */

  const cartCount =
    cart.reduce(
      (sum, item) =>
        sum + item.qty,
      0
    );


  /* =====================================================
     RENDER
     ===================================================== */

  return (
    <div className="app">

      {/* =================================================
          HEADER
          ================================================= */}

      <Header
        cartCount={cartCount}
        favoriteCount={
          favorites.length
        }

        onCartClick={() =>
          setCartOpen(true)
        }

        onFavoritesClick={() =>
          setView("favorites")
        }

        onProdutosClick={
          goToProdutos
        }

        onSobreClick={() =>
          setView("about")
        }

        onHome={() =>
          setView("catalog")
        }

        search={search}

        onSearchChange={(value) => {
          setSearch(value);

          if (
            view !== "catalog"
          ) {
            setView("catalog");
          }
        }}

        theme={theme}

        onThemeChange={setTheme}
      />


      {/* =================================================
          CATÁLOGO
          ================================================= */}

      {view === "catalog" && (
        <>
          <PromoCarousel
            onProductsClick={
              goToProdutos
            }
          />

          <Catalog
            onOpen={setOpenProduct}
            onAdd={addToCart}

            filter={filter}

            setFilter={setFilter}

            search={search}

            favorites={favorites}

            onToggleFavorite={
              toggleFavorite
            }
          />
        </>
      )}


      {/* =================================================
          FAVORITOS
          ================================================= */}

      {view === "favorites" && (
        <FavoritesPage
          favorites={favorites}

          onOpen={setOpenProduct}

          onAdd={addToCart}

          onToggleFavorite={
            toggleFavorite
          }

          onBrowse={
            goToProdutos
          }
        />
      )}


      {/* =================================================
          SOBRE
          ================================================= */}

      {view === "about" && (
        <About />
      )}


      {/* =================================================
          CHECKOUT
          ================================================= */}

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


      {/* =================================================
          DETALHE DO PRODUTO
          ================================================= */}

      <ProductDetail
        product={openProduct}

        onClose={() =>
          setOpenProduct(null)
        }

        onAdd={addToCart}

        isFavorite={
          openProduct
            ? favorites.includes(
                openProduct.id
              )
            : false
        }

        onToggleFavorite={
          toggleFavorite
        }
      />


      {/* =================================================
          CARRINHO
          ================================================= */}

      <CartDrawer
        open={cartOpen}

        items={cart}

        onClose={() =>
          setCartOpen(false)
        }

        onQty={setQty}

        onRemove={removeItem}

        onCheckout={() => {
          setCartOpen(false);
          setView("checkout");
        }}
      />


      {/* =================================================
          FOOTER
          ================================================= */}

      <Footer
        onProdutosClick={
          goToProdutos
        }

        onCategoriaClick={
          goToCategoria
        }

        onSobreClick={() =>
          setView("about")
        }

        theme={theme}
      />

    </div>
  );
}