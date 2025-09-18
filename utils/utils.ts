export function formatPrice(value: number) {
  if (!value) return "$ 0";
  return `$ ${value / 100}`;
}
