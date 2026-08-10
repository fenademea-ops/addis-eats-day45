
import transactions from "./transactions.js";

import {
    generateReport,
    updateTransaction
} from "./report.js";

// Generate the transaction report
const report = generateReport(transactions);

// Display the report
console.log("========================================");
console.log("       TELEBIRR TRANSACTION REPORT");
console.log("========================================");

console.log("\n--- Credit Transactions ---");

report.credits.forEach(transaction => {
    console.log(
        `${transaction.customer}: ETB ${transaction.amount}`
    );
});

console.log("\n--- Debit Transactions ---");

report.debits.forEach(transaction => {
    console.log(
        `${transaction.customer}: ETB ${transaction.amount}`
    );
});

console.log("\n--- Transaction Totals ---");

console.log(`Total Credit: ETB ${report.totalCredit}`);
console.log(`Total Debit: ETB ${report.totalDebit}`);

console.log("\n--- Customer Receipts ---");

report.receipts.forEach(receipt => {
    console.log(receipt);
});

// Demonstrate spread syntax
console.log("\n--- Updated Transaction ---");

const originalTransaction = transactions[0];

const updatedTransaction = updateTransaction(
    originalTransaction,
    600
);

console.log("Original transaction:");
console.log(originalTransaction);

console.log("Updated copy:");
console.log(updatedTransaction);

console.log("\nOriginal object was not changed.");