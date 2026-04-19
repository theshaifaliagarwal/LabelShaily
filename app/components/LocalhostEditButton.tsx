'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function LocalhostEditButton({ productId }: { productId: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const h = window.location.hostname;
    setShow(h === 'localhost' || h === '127.0.0.1' || h === '[::1]');
  }, []);

  if (!show) return null;

  return (
    <Link
      href={`/admin/${productId}`}
      className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-sm font-medium rounded-xl transition-colors shadow-sm"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
      Edit Product
    </Link>
  );
}
