import React from 'react';
import { Search } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  body?: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, body, action }: EmptyStateProps) {
  return (
    <div className="py-16 px-6 text-center glass-card rounded-2xl">
      <div className="w-14 h-14 mx-auto rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-muted mb-4">
        <Search className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-semibold text-fg">{title}</h3>
      {body && <p className="text-muted mt-2 max-w-md mx-auto">{body}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
