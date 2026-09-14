import { useMemo } from "react";
import Hero from "./Hero";
import PromoBanner from "./PromoBanner";
import ProductCard from "./ProductCard";
import { PRODUCTS, CATEGORIES } from "../data/products";

export default function Catalog({ onOpen, onAdd, filter, setFilter, search, favorites, onToggleFavorite }) {
  const list = useMemo(() => {
    let items = filter === "Tudo" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      items = items.filter(
        (p) => p.name.toLowerCase().includes(q) || p.note.toLowerCase().includes(q)
      );
    }
    return items;
  }, [filter, search]);

  return (
    <main>
      <Hero />
      <PromoBanner onCtaClick={() => document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" })} />

      <div id="produtos" className="section-anchor">
        <div className="filters">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={"filter-tab" + (filter === c ? " active" : "")}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {list.length === 0 ? (
          <p className="empty-msg grid-empty">
            Nenhum produto encontrado{search ? ` para "${search}"` : ""}.
          </p>
        ) : (
          <div className="grid">
            {list.map((p, idx) => (
              <div key={p.id} className="grid-item" style={{ animationDelay: `${idx * 0.04}s` }}>
                <ProductCard
                  product={p}
                  onOpen={onOpen}
                  onAdd={onAdd}
                  isFavorite={favorites.includes(p.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
