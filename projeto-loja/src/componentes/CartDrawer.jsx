import { X, Plus, Minus, Trash2 } from "lucide-react";
import ProductIcon from "./ProductIcon";
import { money } from "../utils/format";

export default function CartDrawer({ open, items, onClose, onQty, onRemove, onCheckout }) {
  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);

  return (
    <div className={"drawer-wrap" + (open ? " open" : "")}>
      <div className="drawer-scrim" onClick={onClose} />
      <div className="drawer">
        <div className="drawer-head">
          <h3>Sacola</h3>
          <button className="overlay-close" onClick={onClose}><X size={18} /></button>
        </div>
        {items.length === 0 ? (
          <p className="empty-msg">Sua sacola está vazia. Volte ao catálogo para escolher algo.</p>
        ) : (
          <div className="drawer-items">
            {items.map((i) => (
              <div className="drawer-item" key={i.product.id}>
                <ProductIcon type={i.product.icon} className="drawer-item-icon" />
                <div className="drawer-item-info">
                  <p className="drawer-item-name">{i.product.name}</p>
                  <p className="drawer-item-price">{money(i.product.price)}</p>
                  <div className="qty-row small">
                    <button className="qty-btn" onClick={() => onQty(i.product.id, Math.max(1, i.qty - 1))}><Minus size={12} /></button>
                    <span className="qty-value">{i.qty}</span>
                    <button className="qty-btn" onClick={() => onQty(i.product.id, i.qty + 1)}><Plus size={12} /></button>
                    <button className="remove-btn" onClick={() => onRemove(i.product.id)}><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="drawer-foot">
          <div className="subtotal-row">
            <span>Subtotal</span>
            <span>{money(subtotal)}</span>
          </div>
          <button className="btn-primary" disabled={items.length === 0} onClick={onCheckout}>
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
}
