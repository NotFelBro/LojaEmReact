import { Heart } from "lucide-react";
import ProductCard from "./ProductCard";
import { PRODUCTS } from "../data/products";

export default function FavoritesPage({ favorites, onOpen, onAdd, onToggleFavorite, onBrowse }) {
  const items = PRODUCTS.filter((p) => favorites.includes(p.id));

  return (
    <main className="page-wrap">
      <div className="page-head">
        <h1>Seus favoritos</h1>
        <p className="hero-sub">Os produtos que você marcou com o coração ficam guardados aqui.</p>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <Heart size={28} strokeWidth={1.4} />
          <p>Você ainda não favoritou nenhum produto.</p>
          <button className="btn-primary narrow" onClick={onBrowse}>Ver catálogo</button>
        </div>
      ) : (
        <div className="grid">
          {items.map((p, idx) => (
            <div key={p.id} className="grid-item" style={{ animationDelay: `${idx * 0.04}s` }}>
              <ProductCard
                product={p}
                onOpen={onOpen}
                onAdd={onAdd}
                isFavorite={true}
                onToggleFavorite={onToggleFavorite}
              />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
