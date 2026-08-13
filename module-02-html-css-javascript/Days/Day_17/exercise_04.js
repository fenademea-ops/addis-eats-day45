// Higher-Order Function that accepts a list and a callback function
function applyToAll(list, fn) {
  const result = [];
  for (let i = 0; i < list.length; i++) {
    result.push(fn(list[i]));
  }
  return result;
}

// Pure helper function to add 15% VAT
const addVat = (price) => price * 1.15;

const basePrices = [100, 250, 500, 1000];
const pricesWithVat = applyToAll(basePrices, addVat);

console.log("Base Prices:", basePrices);
console.log("Prices with VAT (15%):", pricesWithVat);