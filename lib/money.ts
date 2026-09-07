const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/** Formats cents as USD. Whole dollars drop the decimals: 6500 → "$65". */
export function formatPrice(cents: number): string {
  const dollars = cents / 100;
  return Number.isInteger(dollars) ? usd.format(dollars) : usd.format(dollars);
}

/** Schema.org wants a decimal string: 6500 → "65.00". */
export function priceForSchema(cents: number): string {
  return (cents / 100).toFixed(2);
}
