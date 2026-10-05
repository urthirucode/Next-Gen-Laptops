/**
 * Formats a numeric price in Indian Rupees (e.g., 124990 -> ₹1,24,990)
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Formats a price in compact Indian numbering (e.g., 124990 -> ₹1.25L, 78990 -> ₹79K)
 */
export function formatPriceCompact(amount: number): string {
  if (amount >= 100000) {
    const lakhs = (amount / 100000).toFixed(2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1');
    return `₹${lakhs}L`;
  }
  const thousands = Math.round(amount / 1000);
  return `₹${thousands}K`;
}

/**
 * Calculates monthly EMI for a given principal and tenure in months
 */
export function calculateMonthlyEmi(price: number, months = 12): number {
  return Math.round(price / months);
}
