import { notFound } from 'next/navigation';
import { getAllProducts, getProductById } from '@/app/lib/data';
import { updateProduct } from '../actions';
import ProductForm from '../components/ProductForm';

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((p) => ({ id: p.id }));
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-semibold text-zinc-100 mb-6">Edit — {product.name}</h1>
      <ProductForm action={updateProduct} initial={product} />
    </div>
  );
}
