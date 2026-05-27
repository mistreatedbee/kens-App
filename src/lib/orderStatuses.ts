import type { Order } from '../context/StoreContext';

export const ORDER_STATUSES: Order['status'][] = [
  'New',
  'Pending',
  'Confirmed',
  'Processing',
  'Ready for Collection',
  'Out for Delivery',
  'Completed',
  'Cancelled',
];
