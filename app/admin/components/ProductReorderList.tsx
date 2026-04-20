'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { reorderProducts, deleteProduct } from '../actions';

interface ProductItem {
  id: string;
  name: string;
  price: number;
  slug: string;
  firstImage: string | null;
  gradientFrom: string;
  gradientVia: string;
  gradientTo: string;
  variantCount: number;
}

export default function ProductReorderList({ items }: { items: ProductItem[] }) {
  const [ids, setIds] = useState(items.map((p) => p.id));
  const [isDirty, setIsDirty] = useState(false);
  const [savePending, startSave] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  const productMap = Object.fromEntries(items.map((p) => [p.id, p]));

  function moveUp(i: number) {
    if (i === 0) return;
    const next = [...ids];
    [next[i - 1], next[i]] = [next[i], next[i - 1]];
    setIds(next);
    setIsDirty(true);
  }

  function moveDown(i: number) {
    if (i === ids.length - 1) return;
    const next = [...ids];
    [next[i], next[i + 1]] = [next[i + 1], next[i]];
    setIds(next);
    setIsDirty(true);
  }

  function saveOrder() {
    startSave(async () => {
      await reorderProducts(ids);
      setIsDirty(false);
      router.refresh();
    });
  }

  function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeletingId(id);
    deleteProduct(id);
  }

  return (
    <div>
      {isDirty && (
        <div className="flex items-center justify-between bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3 mb-4">
          <span className="text-amber-400 text-sm font-medium">Order changed — save to apply on website.</span>
          <button
            onClick={saveOrder}
            disabled={savePending}
            className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors"
          >
            {savePending ? 'Saving…' : 'Save Order'}
          </button>
        </div>
      )}

      <div className="space-y-2">
        {ids.map((id, i) => {
          const p = productMap[id];
          if (!p) return null;
          const gradient = `linear-gradient(135deg, ${p.gradientFrom}, ${p.gradientVia}, ${p.gradientTo})`;
          const isDeleting = deletingId === id;

          return (
            <div
              key={id}
              className={`flex items-center gap-3 bg-zinc-800/60 border border-zinc-700/60 rounded-xl p-3 transition-opacity ${isDeleting ? 'opacity-40 pointer-events-none' : ''}`}
            >
              {/* Position number */}
              <span className="text-zinc-600 text-xs font-mono w-5 text-right shrink-0">{i + 1}</span>

              {/* Up / Down */}
              <div className="flex flex-col gap-0.5 shrink-0">
                <button
                  type="button"
                  onClick={() => moveUp(i)}
                  disabled={i === 0}
                  title="Move up"
                  className="w-6 h-6 flex items-center justify-center rounded text-zinc-500 hover:text-zinc-100 hover:bg-zinc-700 disabled:opacity-20 disabled:cursor-not-allowed transition-colors text-xs"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveDown(i)}
                  disabled={i === ids.length - 1}
                  title="Move down"
                  className="w-6 h-6 flex items-center justify-center rounded text-zinc-500 hover:text-zinc-100 hover:bg-zinc-700 disabled:opacity-20 disabled:cursor-not-allowed transition-colors text-xs"
                >
                  ↓
                </button>
              </div>

              {/* Thumbnail */}
              <div
                className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-zinc-700"
                style={{ background: gradient }}
              >
                {p.firstImage && (
                  <Image src={p.firstImage} alt={p.name} fill className="object-cover" sizes="48px" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-zinc-100 text-sm font-medium truncate">{p.name}</p>
                <p className="text-zinc-500 text-xs">
                  ₹{p.price} · {p.variantCount} colour{p.variantCount !== 1 ? 's' : ''}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`/admin/${p.id}`}
                  className="px-3 py-1.5 text-xs text-zinc-300 hover:text-zinc-100 border border-zinc-700 hover:border-zinc-500 rounded-lg transition-colors"
                >
                  Edit
                </a>
                <button
                  type="button"
                  onClick={() => handleDelete(p.id, p.name)}
                  className="px-3 py-1.5 text-xs text-zinc-500 hover:text-red-400 border border-zinc-700 hover:border-red-500/50 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
