export default function deliveryEstimate(area = "Addis Ababa") {
  const normalizedArea = area.toLowerCase();
  const minutes = normalizedArea.includes("bole") || normalizedArea.includes("piassa") ? 30 : 45;
  return `${minutes}-${minutes + 15} minutes`;
}