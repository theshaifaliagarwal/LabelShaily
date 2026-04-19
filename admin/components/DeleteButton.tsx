'use client';

import { useTransition } from 'react';

interface DeleteButtonProps {
  id: string;
  name: string;
  deleteAction: (id: string) => Promise<void>;
}

export default function DeleteButton({ id, name, deleteAction }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    startTransition(async () => {
      await deleteAction(id);
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="text-xs text-red-400 hover:text-red-300 disabled:opacity-40 px-2.5 py-1 rounded-lg border border-red-500/30 hover:border-red-500/60 transition-colors"
    >
      {isPending ? '…' : 'Delete'}
    </button>
  );
}
