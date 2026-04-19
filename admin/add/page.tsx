import { createProduct } from '../actions';
import ProductForm from '../components/ProductForm';

export default function AddProductPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-semibold text-zinc-100 mb-6">Add New Product</h1>
      <ProductForm action={createProduct} />
    </div>
  );
}
