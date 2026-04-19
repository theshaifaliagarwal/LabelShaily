'use server';

import fs from 'fs';
import path from 'path';
import { redirect } from 'next/navigation';
import { getAllProducts, saveProducts, ensureImagesDir, deleteImageFile, deleteVideoFile } from '@/app/lib/data';
import type { Candle, CandleVariant, CandleVideo } from '@/app/lib/products';

type ActionState = { error: string } | null;

interface VariantDraftMeta {
  id: string;
  color: string;
  gradientFrom: string;
  gradientVia: string;
  gradientTo: string;
  existingImages: { url: string; alt: string }[];
  clearedImageUrls: string[];
  newImages: { key: string; alt: string }[];
  existingVideos: { url: string; caption: string }[];
  clearedVideoUrls: string[];
  newVideos: { key: string; caption: string }[];
}

function slugify(name: string): string {
  return name.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
}

function uniqueSlug(base: string, excludeId?: string): string {
  const products = getAllProducts().filter((p) => p.id !== excludeId);
  const taken = new Set(products.map((p) => p.slug));
  let slug = base;
  let i = 2;
  while (taken.has(slug)) slug = `${base}-${i++}`;
  return slug;
}

async function saveUploadedImage(file: File, key: string): Promise<string> {
  ensureImagesDir();
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const filename = `${key}-${Date.now()}.${ext}`;
  const filepath = path.join(process.cwd(), 'public', 'products', filename);
  fs.writeFileSync(filepath, Buffer.from(await file.arrayBuffer()));
  return `/products/${filename}`;
}

async function saveUploadedVideo(file: File, key: string): Promise<string> {
  ensureImagesDir();
  const ext = file.name.split('.').pop()?.toLowerCase() || 'mp4';
  const filename = `${key}-${Date.now()}.${ext}`;
  const filepath = path.join(process.cwd(), 'public', 'products', filename);
  fs.writeFileSync(filepath, Buffer.from(await file.arrayBuffer()));
  return `/products/${filename}`;
}

async function buildVariants(
  variantsMeta: VariantDraftMeta[],
  formData: FormData,
  slugBase: string
): Promise<CandleVariant[]> {
  const variants: CandleVariant[] = [];

  for (let i = 0; i < variantsMeta.length; i++) {
    const meta = variantsMeta[i];

    for (const url of meta.clearedImageUrls) {
      deleteImageFile(url);
    }
    for (const url of (meta.clearedVideoUrls || [])) {
      deleteVideoFile(url);
    }

    const images = [...meta.existingImages];
    for (const ni of meta.newImages) {
      const file = formData.get(`variantNewImage_${meta.id}_${ni.key}`) as File | null;
      if (file && file.size > 0) {
        const url = await saveUploadedImage(file, `${slugBase}-v${i + 1}`);
        images.push({ url, alt: ni.alt });
      }
    }

    const videos: CandleVideo[] = [...(meta.existingVideos || [])];
    for (const nv of (meta.newVideos || [])) {
      const file = formData.get(`variantNewVideo_${meta.id}_${nv.key}`) as File | null;
      if (file && file.size > 0) {
        const url = await saveUploadedVideo(file, `${slugBase}-v${i + 1}-vid`);
        videos.push({ url, caption: nv.caption });
      }
    }

    variants.push({
      id: meta.id,
      color: meta.color || `Variant ${i + 1}`,
      gradientFrom: meta.gradientFrom || '#fef9c3',
      gradientVia: meta.gradientVia || '#fbbf24',
      gradientTo: meta.gradientTo || '#d97706',
      images,
      videos,
    });
  }

  return variants;
}

export async function createProduct(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const name = (formData.get('name') as string)?.trim();
  const price = parseFloat(formData.get('price') as string);
  const weight = (formData.get('weight') as string)?.trim();
  const dimLength = (formData.get('dimLength') as string)?.trim();
  const dimWidth = (formData.get('dimWidth') as string)?.trim();
  const dimHeight = (formData.get('dimHeight') as string)?.trim();
  const shortDescription = (formData.get('shortDescription') as string)?.trim();
  const longDescription = (formData.get('longDescription') as string)?.trim();
  const scent = (formData.get('scent') as string)?.trim();
  const material = (formData.get('material') as string)?.trim();
  const seoTitle = (formData.get('seoTitle') as string)?.trim() || undefined;
  const seoDescription = (formData.get('seoDescription') as string)?.trim() || undefined;
  const seoKeywords = (formData.get('seoKeywords') as string)?.trim() || undefined;

  if (!name) return { error: 'Product name is required.' };
  if (isNaN(price) || price <= 0) return { error: 'Valid price is required.' };
  if (!shortDescription) return { error: 'Short description is required.' };

  let variantsMeta: VariantDraftMeta[] = [];
  try {
    variantsMeta = JSON.parse((formData.get('variantsData') as string) || '[]');
  } catch {
    return { error: 'Invalid variants data.' };
  }
  if (variantsMeta.length === 0) return { error: 'At least one colour variant is required.' };

  const slug = uniqueSlug(slugify(name));

  let variants: CandleVariant[];
  try {
    variants = await buildVariants(variantsMeta, formData, slug);
  } catch {
    return { error: 'Failed to save one or more images.' };
  }

  const product: Candle = {
    id: crypto.randomUUID(),
    slug,
    name,
    price,
    weight: weight || '',
    dimensions: { length: dimLength || '', width: dimWidth || '', height: dimHeight || '' },
    shortDescription,
    longDescription: longDescription || shortDescription,
    scent: scent || '',
    material: material || '',
    variants,
    seoTitle,
    seoDescription,
    seoKeywords,
  };

  const products = getAllProducts();
  products.push(product);
  saveProducts(products);
  redirect('/admin');
}

export async function updateProduct(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const id = formData.get('id') as string;
  const name = (formData.get('name') as string)?.trim();
  const price = parseFloat(formData.get('price') as string);
  const weight = (formData.get('weight') as string)?.trim();
  const dimLength = (formData.get('dimLength') as string)?.trim();
  const dimWidth = (formData.get('dimWidth') as string)?.trim();
  const dimHeight = (formData.get('dimHeight') as string)?.trim();
  const shortDescription = (formData.get('shortDescription') as string)?.trim();
  const longDescription = (formData.get('longDescription') as string)?.trim();
  const scent = (formData.get('scent') as string)?.trim();
  const material = (formData.get('material') as string)?.trim();
  const seoTitle = (formData.get('seoTitle') as string)?.trim() || undefined;
  const seoDescription = (formData.get('seoDescription') as string)?.trim() || undefined;
  const seoKeywords = (formData.get('seoKeywords') as string)?.trim() || undefined;

  if (!name) return { error: 'Product name is required.' };
  if (isNaN(price) || price <= 0) return { error: 'Valid price is required.' };

  const products = getAllProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return { error: 'Product not found.' };

  let variantsMeta: VariantDraftMeta[] = [];
  try {
    variantsMeta = JSON.parse((formData.get('variantsData') as string) || '[]');
  } catch {
    return { error: 'Invalid variants data.' };
  }
  if (variantsMeta.length === 0) return { error: 'At least one colour variant is required.' };

  const existing = products[idx];
  const slug = name !== existing.name ? uniqueSlug(slugify(name), id) : existing.slug;

  let variants: CandleVariant[];
  try {
    variants = await buildVariants(variantsMeta, formData, slug);
  } catch {
    return { error: 'Failed to save one or more images.' };
  }

  products[idx] = {
    ...existing,
    name,
    slug,
    price,
    weight: weight || existing.weight,
    dimensions: {
      length: dimLength || existing.dimensions.length,
      width: dimWidth || existing.dimensions.width,
      height: dimHeight || existing.dimensions.height,
    },
    shortDescription: shortDescription || existing.shortDescription,
    longDescription: longDescription || existing.longDescription,
    scent: scent || existing.scent,
    material: material || existing.material,
    variants,
    seoTitle,
    seoDescription,
    seoKeywords,
  };

  saveProducts(products);
  redirect('/admin');
}

export async function deleteProduct(id: string): Promise<void> {
  const products = getAllProducts();
  const target = products.find((p) => p.id === id);
  if (target) {
    for (const v of target.variants) {
      for (const img of v.images) deleteImageFile(img.url);
      for (const vid of (v.videos || [])) deleteVideoFile(vid.url);
    }
  }
  saveProducts(products.filter((p) => p.id !== id));
  redirect('/admin');
}

export async function reorderProducts(orderedIds: string[]): Promise<void> {
  const products = getAllProducts();
  const updated = products.map((p) => ({
    ...p,
    order: orderedIds.includes(p.id) ? orderedIds.indexOf(p.id) : products.length,
  }));
  saveProducts(updated);
}
