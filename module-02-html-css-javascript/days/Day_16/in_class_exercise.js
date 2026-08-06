// Step 1: Input variables & conversion
const rawBill = "450"; 
const partySize = 3;  
const paymentMethod = "TeleBirr";

const bill = Number(rawBill);

// Step 2: Tiered tip calculation (10% if > 300 ETB, else 5%)
const tipRate = bill > 300 ? 0.10 : 0.05;
const tipAmount = bill * tipRate;

// Step 5: Determine service fee using a switch statement
let serviceFee = 0;
switch (paymentMethod) {
  case "TeleBirr":
    serviceFee = 5; 
    break;
  case "CBE Birr":
    serviceFee = 3;  
    break;
  default:
    serviceFee = 0;
    break;
}

// Step 3: Compute total and per-person amounts
const totalAmount = bill + tipAmount + serviceFee;
const perPerson = totalAmount / partySize;

// Step 4: Output formatted message with template literal
console.log(`
--- TeleBirr Bill Splitter ---
Base Bill:      ${bill.toFixed(2)} ETB
Tip (${(tipRate * 100)}\%):${tipAmount.toFixed(2)} ETB
Service Fee:    ${serviceFee.toFixed(2)} ETB (${paymentMethod})
------------------------------
Total Bill:     ${totalAmount.toFixed(2)} ETB
Party Size:     ${partySize} people
------------------------------
Amount/Person:  ${perPerson.toFixed(2)} ETB
`);