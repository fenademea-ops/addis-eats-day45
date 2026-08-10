// ==========================================
// Exercise 1: Array Methods Chain (map, filter, reduce)
// ==========================================
console.log("--- Exercise 1 ---");
const prices = [200, 450, 800, 1200, 600];

const grandTotal = prices
  .map(price => price * 1.15)                   // Add 15% VAT
  .filter(priceWithVat => priceWithVat < 1000)  // Keep items under 1000 ETB
  .reduce((sum, price) => sum + price, 0);        // Calculate grand total

console.log(`Grand Total: ${grandTotal} ETB\n`);


// ==========================================
// Exercise 2: Object.entries with for...of Loop
// ==========================================
console.log("--- Exercise 2 ---");
const customer = {
  name: "Feneti",
  city: "Addis Ababa",
  balance: 2500
};

for (const [key, value] of Object.entries(customer)) {
  console.log(`${key}: ${value}`);
}
console.log("");


// ==========================================
// Exercise 3: Destructuring & Parameter Destructuring
// ==========================================
console.log("--- Exercise 3 ---");
// 1. Destructure name and city in one line
const { name, city } = customer;
console.log(`Destructured -> Name: ${name}, City: ${city}`);

// 2. Function using parameter destructuring
function greet({ name }) {
  console.log(`Hello, ${name}!`);
}

greet(customer);
console.log("");


// ==========================================
// Exercise 4: Immutable Object Update with Spread
// ==========================================
console.log("--- Exercise 4 ---");
// Updated copy without mutating the original object
const updatedCustomer = {
  ...customer,
  city: "Hawassa",          // Overwrites city
  phone: "+251911223344"     // Adds new phone property
};

console.log("Original Customer:", customer);
console.log("Updated Customer:", updatedCustomer);