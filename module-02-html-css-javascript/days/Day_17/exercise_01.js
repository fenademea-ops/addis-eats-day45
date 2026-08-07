// 1a. Function Declaration with Default Parameter
function vatDeclaration(amount, rate = 0.15) {
  return amount * rate;
}

// 1b. Arrow Function with Implicit Return
const vatArrow = (amount, rate = 0.15) => amount * rate;

// Test
console.log(vatDeclaration(100));     // 15
console.log(vatArrow(100));           // 15
console.log(vatArrow(100, 0.20));     // 20