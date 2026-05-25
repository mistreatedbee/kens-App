export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export function generateOrderNumber() {
  return `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
}