

// --- 1. Core Module Function ---
function createLoyalty(earnRule = etb => Math.floor(etb / 10)) {
  let points = 0; // Private state protected inside the closure

  return {
    // Earn points based on rule passed in
    earn(etb) { 
      points += earnRule(etb); 
    },

    // Redeem points without dropping below zero
    redeem(p) { 
      points = Math.max(0, points - p); 
    },

    // Return current points
    balance() { 
      return points; 
    },
  };
}


// --- 2. Demo & Self-Check Verification ---
console.log('=== TeleBirr Loyalty Points Demo ===\n');

// Standard rule test (1 point per 10 ETB)
console.log('--- Standard Rule Test ---');
const card = createLoyalty();
card.earn(250); // +25 points
console.log('Balance after earn(250):', card.balance()); // 25

card.redeem(10); // -10 points
console.log('Balance after redeem(10):', card.balance()); // 15

// Refuses to go below zero
card.redeem(50); // Tries to over-redeem
console.log('Balance after redeem(50):', card.balance()); // 0 (refuses negative)


// Holiday rule test (Double points)
console.log('\n--- Swapped Earn Rule (Holiday Double Points) ---');
const holiday = createLoyalty(etb => Math.floor(etb / 10) * 2);
holiday.earn(250); // +50 points
console.log('Holiday card balance (250 ETB spent):', holiday.balance()); // 50


// Independent instances check
console.log('\n--- Independent Card Instances ---');
const cardA = createLoyalty();
const cardB = createLoyalty();

cardA.earn(100); // 10 points
cardB.earn(300); // 30 points

console.log('Card A Balance:', cardA.balance()); // 10
console.log('Card B Balance:', cardB.balance()); // 30 (completely separate)


// Privacy check
console.log('\n--- Privacy Security Check ---');
console.log('Direct access (card.points):', card.points); // undefined
card.points = 999; // Attempt direct overwrite
console.log('Balance after trying card.points = 999:', card.balance()); // Still 0