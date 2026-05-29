import React from 'react';

const colors: Record<string, string> = {
  New: 'bg-secondary/10 text-secondary border-secondary/20',
  Pending: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  Confirmed: 'bg-primary/10 text-primary border-primary/20',
  Processing: 'bg-lightblue/30 text-primary border-lightblue/40',
  'Ready for Collection': 'bg-accent/10 text-accent border-accent/20',
  'Out for Delivery': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  Completed: 'bg-accent/10 text-accent border-accent/20',
  Cancelled: 'bg-red-500/10 text-red-500 border-red-500/20',
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${colors[status] || 'bg-surface text-muted border-primary/10'}`}>
      {status}
    </span>
  );
}
