import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import Stepper from "./Stepper";
import { money } from "../utils/format";

export default function Checkout({ items, onBack, onDone }) {
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState({ name: "", address: "", city: "", zip: "" });
  const [payment, setPayment] = useState({ number: "", name: "", exp: "", cvv: "" });
  const [orderNumber, setOrderNumber] = useState(null);

  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const shippingCost = subtotal > 200 ? 0 : 19.9;
  const total = subtotal + shippingCost;

  function formatCard(v) {
    return v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  }

  function confirmOrder() {
    setOrderNumber("TR-" + Math.floor(100000 + Math.random() * 900000));
  }

  if (orderNumber) {
    return (
      <main className="checkout-wrap">
        <div className="confirm-panel">
          <div className="confirm-icon"><Check size={28} /></div>
          <h2>Pedido confirmado</h2>
          <p className="hero-sub">
            Obrigado, {shipping.name.split(" ")[0] || "cliente"}. Seu pedido{" "}
            <strong>{orderNumber}</strong> foi registrado nesta demonstração.
          </p>
          <button className="btn-primary" onClick={() => onDone()}>Voltar à loja</button>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-wrap">
      <button className="back-link" onClick={onBack}><ArrowLeft size={16} /> Voltar à sacola</button>
      <Stepper step={step} />
      <div className="checkout-grid">
        <div className="checkout-form">
          {step === 0 && (
            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();
                setStep(1);
              }}
            >
              <h3>Endereço de entrega</h3>
              <label>
                Nome completo
                <input required value={shipping.name} onChange={(e) => setShipping({ ...shipping, name: e.target.value })} />
              </label>
              <label>
                Endereço
                <input required value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} />
              </label>
              <div className="form-row">
                <label>
                  Cidade
                  <input required value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} />
                </label>
                <label>
                  CEP
                  <input required value={shipping.zip} onChange={(e) => setShipping({ ...shipping, zip: e.target.value })} />
                </label>
              </div>
              <button className="btn-primary" type="submit">Continuar para pagamento</button>
            </form>
          )}
          {step === 1 && (
            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();
                setStep(2);
              }}
            >
              <h3>Pagamento</h3>
              <p className="hero-sub small">Ambiente de demonstração — não insira dados reais de cartão.</p>
              <label>
                Número do cartão
                <input
                  required
                  value={payment.number}
                  onChange={(e) => setPayment({ ...payment, number: formatCard(e.target.value) })}
                  placeholder="0000 0000 0000 0000"
                />
              </label>
              <label>
                Nome no cartão
                <input required value={payment.name} onChange={(e) => setPayment({ ...payment, name: e.target.value })} />
              </label>
              <div className="form-row">
                <label>
                  Validade
                  <input required value={payment.exp} onChange={(e) => setPayment({ ...payment, exp: e.target.value })} placeholder="MM/AA" />
                </label>
                <label>
                  CVV
                  <input required value={payment.cvv} onChange={(e) => setPayment({ ...payment, cvv: e.target.value.slice(0, 3) })} placeholder="123" />
                </label>
              </div>
              <button className="btn-primary" type="submit">Revisar pedido</button>
            </form>
          )}
          {step === 2 && (
            <div className="form">
              <h3>Revisão</h3>
              <div className="review-block">
                <p className="review-label">Entrega</p>
                <p>{shipping.name}</p>
                <p>{shipping.address}, {shipping.city} — {shipping.zip}</p>
              </div>
              <div className="review-block">
                <p className="review-label">Pagamento</p>
                <p>Cartão terminado em {payment.number.slice(-4) || "----"}</p>
              </div>
              <button className="btn-primary" onClick={confirmOrder}>Confirmar pedido</button>
            </div>
          )}
        </div>
        <aside className="checkout-summary">
          <h3>Resumo</h3>
          {items.map((i) => (
            <div className="summary-line" key={i.product.id}>
              <span>{i.qty}× {i.product.name}</span>
              <span>{money(i.product.price * i.qty)}</span>
            </div>
          ))}
          <div className="summary-line">
            <span>Frete</span>
            <span>{shippingCost === 0 ? "Grátis" : money(shippingCost)}</span>
          </div>
          <div className="summary-line total">
            <span>Total</span>
            <span>{money(total)}</span>
          </div>
        </aside>
      </div>
    </main>
  );
}
