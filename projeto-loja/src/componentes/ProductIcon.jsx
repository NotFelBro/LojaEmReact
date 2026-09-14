export default function ProductIcon({ type, className }) {
  const stroke = "var(--copper)";
  const common = {
    fill: "none",
    stroke,
    strokeWidth: 1.4,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  switch (type) {
    case "bag":
      return (
        <svg viewBox="0 0 120 120" className={className}>
          <path {...common} d="M35 40 L30 100 Q30 108 40 108 L80 108 Q90 108 90 100 L85 40 Z" />
          <path {...common} d="M45 40 L45 28 Q45 16 60 16 Q75 16 75 28 L75 40" />
          <rect x="52" y="52" width="16" height="10" rx="2" fill={stroke} stroke="none" opacity="0.85" />
          <line {...common} x1="30" y1="66" x2="90" y2="66" opacity="0.4" />
        </svg>
      );
    case "grinder":
      return (
        <svg viewBox="0 0 120 120" className={className}>
          <rect {...common} x="42" y="18" width="36" height="30" rx="4" />
          <path {...common} d="M46 48 L44 96 Q44 104 60 104 Q76 104 74 96 L72 48" />
          <line {...common} x1="60" y1="18" x2="60" y2="8" />
          <circle {...common} cx="60" cy="6" r="3" />
          <line {...common} x1="48" y1="68" x2="70" y2="68" opacity="0.4" />
        </svg>
      );
    case "dripper":
      return (
        <svg viewBox="0 0 120 120" className={className}>
          <path {...common} d="M32 30 L88 30 L68 92 Q60 100 52 92 Z" />
          <ellipse {...common} cx="60" cy="30" rx="28" ry="7" />
          <path {...common} d="M40 100 L80 100 L80 110 L40 110 Z" opacity="0.5" />
        </svg>
      );
    case "kettle":
      return (
        <svg viewBox="0 0 120 120" className={className}>
          <path {...common} d="M38 50 Q38 96 60 96 Q82 96 82 50 Z" />
          <path {...common} d="M82 55 Q102 48 96 34 Q92 26 78 32" />
          <path {...common} d="M50 50 Q60 40 70 50" />
          <circle {...common} cx="60" cy="34" r="4" />
        </svg>
      );
    case "scale":
      return (
        <svg viewBox="0 0 120 120" className={className}>
          <rect {...common} x="24" y="70" width="72" height="28" rx="5" />
          <rect {...common} x="44" y="50" width="32" height="20" rx="3" />
          <line {...common} x1="40" y1="84" x2="80" y2="84" opacity="0.4" />
        </svg>
      );
    case "mug":
      return (
        <svg viewBox="0 0 120 120" className={className}>
          <path {...common} d="M32 40 L32 84 Q32 100 56 100 Q80 100 80 84 L80 40 Z" />
          <path {...common} d="M80 50 Q100 50 100 66 Q100 82 80 80" />
          <line {...common} x1="32" y1="54" x2="80" y2="54" opacity="0.4" />
        </svg>
      );
    default:
      return null;
  }
}
