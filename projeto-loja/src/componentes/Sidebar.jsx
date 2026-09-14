import { useState } from "react";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";
import { PRODUCTS, CATEGORIES } from "../data/products";
import "./Sidebar.css";

export default function Sidebar({ filter, setFilter }) {
  const [open, setOpen] = useState(false);

  function categoryCount(category) {
    if (category === "Tudo") return PRODUCTS.length;

    return PRODUCTS.filter(
      (product) => product.category === category
    ).length;
  }

  function selectCategory(category) {
    setFilter(category);
    setOpen(false);
  }

  return (
    <>
      {/* Botão mobile */}
      <button
        type="button"
        className="sidebar-mobile-trigger"
        onClick={() => setOpen(true)}
      >
        <SlidersHorizontal size={17} strokeWidth={1.8} />
        <span>Filtros</span>
        <ChevronDown size={15} strokeWidth={1.8} />
      </button>

      {/* Fundo escuro no mobile */}
      {open && (
        <button
          type="button"
          className="sidebar-backdrop"
          onClick={() => setOpen(false)}
          aria-label="Fechar filtros"
        />
      )}

      <aside
        className={`catalog-sidebar ${
          open ? "catalog-sidebar-open" : ""
        }`}
      >
        <div className="sidebar-header">
          <div>
            <span className="sidebar-eyebrow">Comprar</span>
            <h2>Filtros</h2>
          </div>

          <button
            type="button"
            className="sidebar-close"
            onClick={() => setOpen(false)}
            aria-label="Fechar filtros"
          >
            <X size={18} strokeWidth={1.7} />
          </button>
        </div>

        <div className="sidebar-divider" />

        <section className="sidebar-section">
          <span className="sidebar-section-title">
            Categorias
          </span>

          <div className="sidebar-categories">
            {CATEGORIES.map((category) => (
              <button
                type="button"
                key={category}
                className={`sidebar-category ${
                  filter === category ? "active" : ""
                }`}
                onClick={() => selectCategory(category)}
              >
                <span>{category}</span>

                <span className="sidebar-count">
                  {categoryCount(category)}
                </span>
              </button>
            ))}
          </div>
        </section>

        <div className="sidebar-divider" />

        <div className="sidebar-tip">
          <span className="sidebar-tip-label">TORRA</span>

          <strong>
            Encontre seu café.
          </strong>

          <p>
            Explore grãos, equipamentos e acessórios
            para o seu preparo.
          </p>
        </div>
      </aside>
    </>
  );
}