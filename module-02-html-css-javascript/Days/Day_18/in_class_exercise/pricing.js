
const VAT_RATE = 0.15;

/**
 * Calculates the total amount including VAT.
 * @param {number} amount - Subtotal
 * @returns {number} Amount with VAT
 */
export const withVat = (amount) => amount * (1 + VAT_RATE);

/**
 * Formats a number as ETB currency.
 * @param {number} amount - Numerical amount
 * @returns {string} Formatted string (e.g., "3,105.00 ETB")
 */
export const format = (amount) =>
  `${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ETB`;