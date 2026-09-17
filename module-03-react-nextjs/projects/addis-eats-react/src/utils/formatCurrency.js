export default function formatCurrency(amount) {
  return `${new Intl.NumberFormat("en-US").format(Number(amount) || 0)} ETB`;
}