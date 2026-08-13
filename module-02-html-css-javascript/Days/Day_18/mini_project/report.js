// Functions for generating the TeleBirr transaction report

// Separate credit transactions using filter()
export function getCredits(transactions) {
    return transactions.filter(transaction => transaction.type === "credit");
}

// Separate debit transactions using filter()
export function getDebits(transactions) {
    return transactions.filter(transaction => transaction.type === "debit");
}

// Calculate total credit amount using reduce()
export function getTotalCredit(transactions) {
    return transactions
        .filter(transaction => transaction.type === "credit")
        .reduce((total, transaction) => total + transaction.amount, 0);
}

// Calculate total debit amount using reduce()
export function getTotalDebit(transactions) {
    return transactions
        .filter(transaction => transaction.type === "debit")
        .reduce((total, transaction) => total + transaction.amount, 0);
}

// Create receipt strings using map() and destructuring
export function createReceipts(transactions) {
    return transactions.map(({ customer, amount }) => {
        return `Receipt: ${customer} — ETB ${amount}`;
    });
}

// Create an updated copy using spread syntax
export function updateTransaction(transaction, newAmount) {
    return {
        ...transaction,
        amount: newAmount
    };
}

// Generate the complete report
export function generateReport(transactions) {
    const credits = getCredits(transactions);
    const debits = getDebits(transactions);

    const totalCredit = getTotalCredit(transactions);
    const totalDebit = getTotalDebit(transactions);

    const receipts = createReceipts(transactions);

    return {
        credits,
        debits,
        totalCredit,
        totalDebit,
        receipts
    };
}