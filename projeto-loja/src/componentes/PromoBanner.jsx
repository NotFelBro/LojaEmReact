export default function PromoBanner({ onCtaClick }) {
  return (
    <section className="promo-banner">
      <div className="promo-text">
        <p className="promo-kicker">Assinatura Torra</p>
        <h2>Grãos frescos na sua porta, todo mês.</h2>
        <p className="promo-sub">
          Escolha a torra, a frequência e o moído. Frete grátis em compras
          acima de R$ 200 e cancelamento a qualquer momento.
        </p>
        <button className="promo-cta" onClick={onCtaClick}>Ver produtos</button>
      </div>
      <div className="promo-figure" aria-hidden="true">
        <svg viewBox="0 0 200 160" className="promo-svg">
          <circle cx="100" cy="80" r="70" className="promo-ring" />
          <path
            d="M70 60 L64 120 Q64 130 76 130 L124 130 Q136 130 136 120 L130 60 Z"
            className="promo-bag"
          />
          <path d="M82 60 L82 44 Q82 30 100 30 Q118 30 118 44 L118 60" className="promo-bag" />
          <rect x="90" y="78" width="20" height="12" rx="2" className="promo-label" />
        </svg>
      </div>
    </section>
  );
}
