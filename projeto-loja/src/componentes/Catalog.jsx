import { useMemo } from "react";
import Hero from "./Hero";
import PromoBanner from "./PromoBanner";
import ProductCard from "./ProductCard";
import Sidebar from "./Sidebar";
import { PRODUCTS } from "../data/products";

export default function Catalog({
  onOpen,
  onAdd,
  filter,
  setFilter,
  search,
  favorites,
  onToggleFavorite,
}) {
  const list = useMemo(() => {
    let items =
      filter === "Tudo"
        ? PRODUCTS
        : PRODUCTS.filter(
            (product) =>
              product.category === filter
          );

    if (search.trim()) {
      const q = search.trim().toLowerCase();

      items = items.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(q) ||
          product.note
            .toLowerCase()
            .includes(q)
      );
    }

    return items;
  }, [filter, search]);

  return (
    <main>
      <Hero />

      <PromoBanner
        onCtaClick={() =>
          document
            .getElementById("produtos")
            ?.scrollIntoView({
              behavior: "smooth",
            })
        }
      />

      <div
        id="produtos"
        className="section-anchor catalog-section"
      >
        <div className="catalog-heading">
          <div>
            <span className="catalog-kicker">
              Catálogo
            </span>

            <h2>
              {filter === "Tudo"
                ? "Todos os produtos"
                : filter}
            </h2>
          </div>

          <span className="catalog-result-count">
            {list.length}{" "}
            {list.length === 1
              ? "produto"
              : "produtos"}
          </span>
        </div>

        <div className="catalog-layout">
          <Sidebar
            filter={filter}
            setFilter={setFilter}
          />

          <div className="catalog-products">
            {list.length === 0 ? (
              <p className="empty-msg grid-empty">
                Nenhum produto encontrado
                {search
                  ? ` para "${search}"`
                  : "."}
              </p>
            ) : (
              <div className="grid">
                {list.map((product, index) => (
                  <div
                    key={product.id}
                    className="grid-item"
                    style={{
                      animationDelay: `${
                        index * 0.04
                      }s`,
                    }}
                  >
                    <ProductCard
                      product={product}
                      onOpen={onOpen}
                      onAdd={onAdd}
                      isFavorite={favorites.includes(
                        product.id
                      )}
                      onToggleFavorite={
                        onToggleFavorite
                      }
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}