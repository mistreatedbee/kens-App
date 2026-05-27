import React from 'react';

interface ConfirmModalProps {
  open: boolean;
  title: string;
  body: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  open,
  title,
  body,
  confirmLabel = 'Delete',
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-background border border-black/10 dark:border-white/10 p-6 shadow-2xl">
        <h2 className="text-xl font-semibold text-fg">{title}</h2>
        <p className="text-muted mt-2">{body}</p>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onCancel} className="px-4 py-2 rounded-xl text-fg bg-black/5 dark:bg-white/5">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-xl bg-red-500 text-white font-medium">
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
