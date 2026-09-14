import ProductIcon from "./ProductIcon";
import { money } from "../utils/format";

export default function ProductCard({ product, onOpen, onAdd }) {
  return (
    <div className="card">
      <button className="card-figure" onClick={() => onOpen(product)}>
        <ProductIcon type={product.icon} className="card-icon" />
      </button>
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
