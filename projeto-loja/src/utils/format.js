export function money(v) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
