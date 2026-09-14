import { useState } from "react";
import { X, Plus, Minus, Heart } from "lucide-react";
import ProductIcon from "./ProductIcon";
import { money } from "../utils/format";

export default function ProductDetail({ product, onClose, onAdd, isFavorite, onToggleFavorite }) {
  const [qty, setQty] = useState(1);
  if (!product) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="detail-panel" onClick={(e) => e.stopPropagation()}>
        <button className="overlay-close" onClick={onClose}><X size={18} /></button>
        <div className="detail-figure">
          <ProductIcon type={product.icon} className="detail-icon" />
        </div>
        <div className="detail-body">
          <div className="detail-head-row">
            <p className="card-category">{product.category}</p>
            <button
              className={"favorite-btn inline" + (isFavorite ? " active" : "")}
              onClick={() => onToggleFavorite(product.id)}
              aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            >
              <Heart size={16} strokeWidth={1.8} fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>
          <h2>{product.name}</h2>
          <p className="detail-note">{product.note}</p>
          <p className="detail-price">{money(product.price)}</p>
          <div className="qty-row">
            <button className="qty-btn" onClick={() => setQty((q) => Math.max(1, q - 1))}><Minus size={14} /></button>
            <span className="qty-value">{qty}</span>
            <button className="qty-btn" onClick={() => setQty((q) => q + 1)}><Plus size={14} /></button>
          </div>
          <button
            className="btn-primary"
            onClick={() => {
              onAdd(product, qty);
              onClose();
            }}
          >
            Adicionar à sacola
          </button>
        </div>
      </div>
    </div>
  );
}
