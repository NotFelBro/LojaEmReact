import { Heart } from "lucide-react";
import ProductIcon from "./ProductIcon";
import { money } from "../utils/format";

export default function ProductCard({ product, onOpen, onAdd, isFavorite, onToggleFavorite }) {
  return (
    <div className="card">
      <div
        className="card-figure"
        role="button"
        tabIndex={0}
        onClick={() => onOpen(product)}
        onKeyDown={(e) => e.key === "Enter" && onOpen(product)}
      >
        <ProductIcon type={product.icon} className="card-icon" />
        <button
          className={"favorite-btn" + (isFavorite ? " active" : "")}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          <Heart size={15} strokeWidth={1.8} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="card-body">
        <p className="card-category">{product.category}</p>
        <button className="card-name" onClick={() => onOpen(product)}>{product.name}</button>
        <p className="card-note">{product.note}</p>
        <div className="card-footer">
          <span className="card-price">{money(product.price)}</span>
          <button className="btn-small" onClick={() => onAdd(product, 1)}>Adicionar</button>
        </div>
      </div>
    </div>
  );
}
