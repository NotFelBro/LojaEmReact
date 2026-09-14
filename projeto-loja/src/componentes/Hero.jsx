import ProductIcon from "./ProductIcon";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <p className="eyebrow">Lote atual · colheita 2026</p>
        <h1>
          Café de origem única,
          <br />
          moído para o seu método.
        </h1>
        <p className="hero-sub">
          Torramos em pequenos lotes e vendemos os equipamentos que usamos
          todos os dias no laboratório de torra. Sem intermediários, sem pressa.
        </p>
      </div>
      <div className="hero-figure">
        <ProductIcon type="bag" className="hero-icon" />
      </div>
    </section>
  );
}
