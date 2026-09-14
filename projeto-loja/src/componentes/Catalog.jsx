import { useMemo } from "react";
import Hero from "./Hero";
import ProductCard from "./ProductCard";
import { PRODUCTS, CATEGORIES } from "../data/products";

export default function Catalog({ onOpen, onAdd, filter, setFilter }) {
  const list = useMemo(
    () => (filter === "Tudo" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <main>
      <Hero />
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
      <div className="grid">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} onOpen={onOpen} onAdd={onAdd} />
        ))}
      </div>
    </main>
  );
}
