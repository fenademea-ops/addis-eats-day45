// Function Factory returning an arrow function
const discountBy = (rate) => (price) => price * (1 - rate);

// Creating specialized discount functions
const memberPrice = discountBy(0.10); // 10% discount
const salePrice = discountBy(0.30);   // 30% discount

const originalPrice = 1000; // 1000 ETB

console.log(`Original Price: ${originalPrice} ETB`);
console.log(`Member Price: ${memberPrice(originalPrice)} ETB`);
console.log(`Sale Price: ${salePrice(originalPrice)} ETB`);