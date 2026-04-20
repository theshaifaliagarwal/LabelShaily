'use client';

import { useActionState } from 'react';
import type { Candle } from '@/app/lib/products';
import VariantsEditor from './VariantsEditor';

type ActionFn = (prev: { error: string } | null, data: FormData) => Promise<{ error: string } | null>;

interface ProductFormProps {
  action: ActionFn;
  initial?: Candle;
}

export default function ProductForm({ action, initial }: ProductFormProps) {
  const [state, formAction, isPending] = useActionState(action, null);

  return (
    <form action={formAction} className="space-y-6">
      {initial && <input type="hidden" name="id" value={initial.id} />}

      {state?.error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm">
          {state.error}
        </div>
      )}

      {/* Main product details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Product Name *" name="name" defaultValue={initial?.name} placeholder="e.g. Lavender Bliss" />
        <Field label="Price (₹) *" name="price" type="number" defaultValue={initial?.price?.toString()} placeholder="450" />
        <Field label="Weight" name="weight" defaultValue={initial?.weight} placeholder="e.g. 200g" />
        <Field label="Scent" name="scent" defaultValue={initial?.scent} placeholder="e.g. Lavender & Chamomile" />
        <Field label="Length (cm)" name="dimLength" defaultValue={initial?.dimensions?.length} placeholder="e.g. 7" />
        <Field label="Width (cm)" name="dimWidth" defaultValue={initial?.dimensions?.width} placeholder="e.g. 7" />
        <Field label="Height (cm)" name="dimHeight" defaultValue={initial?.dimensions?.height} placeholder="e.g. 9" />
        <div className="md:col-span-2">
          <Field label="Material" name="material" defaultValue={initial?.material} placeholder="e.g. Natural Soy Wax" />
        </div>
      </div>

      <TextArea label="Short Description *" name="shortDescription" defaultValue={initial?.shortDescription} rows={2} placeholder="One-line summary shown on product cards." />
      <TextArea label="Long Description" name="longDescription" defaultValue={initial?.longDescription} rows={4} placeholder="Full description shown on the product detail page." />

      {/* Colour variants */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <p className="text-zinc-300 text-sm font-medium">Colour Variants</p>
          <span className="text-zinc-600 text-xs">— same weight, scent &amp; description across all variants</span>
        </div>
        <VariantsEditor initialVariants={initial?.variants} />
      </div>

      {/* SEO */}
      <div className="border border-zinc-700/50 rounded-xl p-5 space-y-4">
        <div>
          <p className="text-zinc-300 text-sm font-medium mb-0.5">SEO</p>
          <p className="text-zinc-600 text-xs">Leave blank to use auto-generated values from product fields.</p>
        </div>
        <Field
          label="Meta Title"
          name="seoTitle"
          defaultValue={initial?.seoTitle}
          placeholder={`e.g. ${initial?.name ?? 'Wine Candle'} — Buy Online | LabelShaily`}
        />
        <TextArea
          label="Meta Description"
          name="seoDescription"
          defaultValue={initial?.seoDescription}
          rows={2}
          placeholder="e.g. Buy our handcrafted rose-scented gel wax candle. Perfect for gifting and home décor."
        />
        <Field
          label="Keywords"
          name="seoKeywords"
          defaultValue={initial?.seoKeywords}
          placeholder="e.g. rose candle, gel wax candle, candle gift India"
        />
      </div>

      {/* Submit */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="px-8 py-3 bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors shadow-lg"
        >
          {isPending ? 'Saving…' : initial ? 'Save Changes' : 'Create Product'}
        </button>
        <a href="/admin" className="px-6 py-3 border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-500 rounded-xl transition-colors">
          Cancel
        </a>
      </div>
    </form>
  );
}

function Field({ label, name, type = 'text', defaultValue, placeholder }: {
  label: string; name: string; type?: string; defaultValue?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        step={type === 'number' ? '0.01' : undefined}
        className="w-full bg-zinc-800 border border-zinc-700 focus:border-amber-500 text-zinc-100 placeholder-zinc-600 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
      />
    </div>
  );
}

function TextArea({ label, name, defaultValue, rows, placeholder }: {
  label: string; name: string; defaultValue?: string; rows?: number; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-1.5">{label}</label>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows ?? 3}
        placeholder={placeholder}
        className="w-full bg-zinc-800 border border-zinc-700 focus:border-amber-500 text-zinc-100 placeholder-zinc-600 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors resize-y"
      />
    </div>
  );
}
