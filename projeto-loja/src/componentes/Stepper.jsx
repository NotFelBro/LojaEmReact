import { Check } from "lucide-react";

export default function Stepper({ step }) {
  const steps = ["Entrega", "Pagamento", "Revisão"];

  return (
    <div className="stepper">
      {steps.map((s, idx) => (
        <div key={s} className={"step" + (idx === step ? " active" : idx < step ? " done" : "")}>
          <span className="step-dot">{idx < step ? <Check size={12} /> : idx + 1}</span>
          <span>{s}</span>
          {idx < steps.length - 1 && <span className="step-line" />}
        </div>
      ))}
    </div>
  );
}
