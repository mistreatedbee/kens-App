export function formatCurrency(amount: number, currency = '$') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency === '$' ? 'USD' : 'ZAR',
    minimumFractionDigits: 2
  }).
  format(amount).
  replace(/[A-Z]{3}\s?/, currency);
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