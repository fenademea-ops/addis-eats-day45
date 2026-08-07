// 1. Calculate sum using rest parameters and Array.prototype.reduce
const subtotal = (...prices) =>
  prices.reduce((total, price) => total + price, 0);

// 2. Factory function returning an arrow function to apply discount rate
const discountBy = (rate) => (amount) => amount * (1 - rate);

// 3. Small pure helpers for VAT (15%) and ETB string formatting
const withVat = (amount) => amount * 1.15;
const toETB = (amount) => `${amount.toFixed(2)} ETB`;

// 4. Closure-based receipt maker with a private counter
function makeReceiptMaker() {
  let orderCounter = 0; // Private state retained by closure

  return function createReceipt(...itemPrices) {
    orderCounter += 1;

    // Calculate base subtotal
    const rawTotal = subtotal(...itemPrices);

    // Default 10% member discount applied before 15% VAT
    const applyMemberDiscount = discountBy(0.10);
    const discountedTotal = applyMemberDiscount(rawTotal);
    const finalAmount = withVat(discountedTotal);

    return `#${orderCounter}: ${toETB(finalAmount)}`;
  };
}

// ==========================================
// Execution / Test Run
// ==========================================
const printReceipt = makeReceiptMaker();

// Order 1: Doro Wat (350), Injera (30), Tej (120)
console.log(printReceipt(350, 30, 120)); 
// Calculation: (500 subtotal * 0.90 discount) * 1.15 VAT = 517.50 ETB
// Output: "#1: 517.50 ETB"

// Order 2: Special Kitfo (450), Shiro (180), Ambo Water (40)
console.log(printReceipt(450, 180, 40)); 
// Calculation: (670 subtotal * 0.90 discount) * 1.15 VAT = 693.45 ETB
// Output: "#2: 693.45 ETB"

// Order 3: Spris Juice (90), Beyaynetu (210)
console.log(printReceipt(90, 210)); 
// Calculation: (300 subtotal * 0.90 discount) * 1.15 VAT = 310.50 ETB
// Output: "#3: 310.50 ETB"