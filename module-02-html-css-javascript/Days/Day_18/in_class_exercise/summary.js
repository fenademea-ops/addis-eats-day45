import { withVat, format } from './pricing.js';
import orders from './order.js';

const ordersWithTotal = orders.map(ord => {
  const subtotal = ord.oredrItem.reduce(
    (sum, { price, quantity }) => sum + Number(price) * quantity,
    0
  );
  
  const total = withVat(subtotal);

  return {
    ...ord,
    total
  };
});

// Step 2: Use filter to get orders over 500 ETB
const highValueOrders = ordersWithTotal.filter(({ total }) => total > 500);

// Step 3: Use reduce to calculate grand total across all orders
const grandTotal = ordersWithTotal.reduce((sum, { total }) => sum + total, 0);

// Step 4: Print formatted summary
console.log('=== ADDIS MARKET ORDER SUMMARY ===\n');

console.log('Orders Over 500 ETB:');
highValueOrders.forEach(({ orderId, custmerName, total }) => {
  console.log(`- Order #${orderId} | Customer: ${custmerName} | Total: ${format(total)}`);
});

console.log('\n----------------------------------');
console.log(`Grand Total (All Orders): ${format(grandTotal)}`);
console.log('----------------------------------');