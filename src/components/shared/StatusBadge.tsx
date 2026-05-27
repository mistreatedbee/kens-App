import React from 'react';

const colors: Record<string, string> = {
  New: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  Pending: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  Confirmed: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
  Processing: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  'Ready for Collection': 'bg-teal-500/10 text-teal-500 border-teal-500/20',
  'Out for Delivery': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  Completed: 'bg-green-500/10 text-green-500 border-green-500/20',
  Cancelled: 'bg-red-500/10 text-red-500 border-red-500/20',
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${colors[status] || 'bg-black/5 dark:bg-white/5 text-muted border-black/10 dark:border-white/10'}`}>
      {status}
    </span>
  );
}
