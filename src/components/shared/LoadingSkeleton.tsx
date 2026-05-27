import React from 'react';

export function LoadingSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: rows }).map((_, idx) => (
        <div key={idx} className="glass-card rounded-2xl overflow-hidden animate-pulse">
          <div className="aspect-[4/5] bg-black/10 dark:bg-white/10" />
          <div className="p-5 space-y-3">
            <div className="h-3 w-1/3 bg-black/10 dark:bg-white/10 rounded" />
            <div className="h-5 w-3/4 bg-black/10 dark:bg-white/10 rounded" />
            <div className="h-5 w-1/2 bg-black/10 dark:bg-white/10 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
