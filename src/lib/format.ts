export function formatCurrency(amount: number, currency = 'R') {
  // Always format using South African Rand when currency is 'R',
  // otherwise fall back to provided currency code.
  const currencyCode = currency === 'R' || currency === 'R-' ? 'ZAR' : currency;
  const locale = currencyCode === 'ZAR' ? 'en-ZA' : 'en-US';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'symbol',
    minimumFractionDigits: 2
  }).format(amount);
}

export function formatDate(dateString: string) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(dateString));
}