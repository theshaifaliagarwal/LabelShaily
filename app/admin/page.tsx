import Image from 'next/image';
import Link from 'next/link';
import { getAllProducts } from '@/app/lib/data';
import ProductReorderList from './components/ProductReorderList';

export default function AdminDashboard() {
  const products = getAllProducts();

  const items = products.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    slug: p.slug,
    firstImage: p.variants[0]?.images[0]?.url ?? null,
    gradientFrom: p.variants[0]?.gradientFrom ?? '#fef9c3',
    gradientVia: p.variants[0]?.gradientVia ?? '#fbbf24',
    gradientTo: p.variants[0]?.gradientTo ?? '#d97706',
    variantCount: p.variants.length,
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-zinc-100">Products</h1>
          <p className="text-zinc-500 text-sm mt-0.5">
            {products.length} candle{products.length !== 1 ? 's' : ''} · drag or use arrows to reorder
          </p>
        </div>
        <Link
          href="/admin/add"
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-white text-sm font-medium rounded-xl transition-colors"
        >
          + Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-zinc-700 rounded-2xl">
          <p className="text-zinc-500 text-sm">No products yet.</p>
          <Link href="/admin/add" className="text-amber-400 hover:text-amber-300 text-sm mt-2 inline-block">
            Add your first candle →
          </Link>
        </div>
      ) : (
        <ProductReorderList items={items} />
      )}
    </div>
  );
}
