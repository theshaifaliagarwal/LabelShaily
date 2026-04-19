import fs from 'fs';
import path from 'path';
import type { Candle, CandleVariant } from './products';

const PRODUCTS_FILE = path.join(process.cwd(), 'data', 'products.json');
const IMAGES_DIR = path.join(process.cwd(), 'public', 'products');

type RawVariant = CandleVariant & { imageUrl?: string; imageAlt?: string };

function normalizeVariant(v: RawVariant): CandleVariant {
  const images =
    !v.images || v.images.length === 0
      ? v.imageUrl
        ? [{ url: v.imageUrl, alt: v.imageAlt || '' }]
        : []
      : v.images;
  return { ...v, images, videos: v.videos || [] };
}

export function getAllProducts(): Candle[] {
  if (!fs.existsSync(PRODUCTS_FILE)) return [];
  try {
    const raw = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8')) as Candle[];
    const normalized = raw.map((p) => ({
      ...p,
      variants: p.variants.map((v) => normalizeVariant(v as RawVariant)),
    }));
    return normalized.sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity));
  } catch {
    return [];
  }
}

export function getProductBySlug(slug: string): Candle | undefined {
  return getAllProducts().find((c) => c.slug === slug);
}

export function getProductById(id: string): Candle | undefined {
  return getAllProducts().find((c) => c.id === id);
}

export function saveProducts(products: Candle[]): void {
  const dir = path.dirname(PRODUCTS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
}

export function ensureImagesDir(): void {
  if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

export function deleteImageFile(imageUrl: string): void {
  if (!imageUrl) return;
  const filename = path.basename(imageUrl);
  const filepath = path.join(IMAGES_DIR, filename);
  if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
}

export function deleteVideoFile(videoUrl: string): void {
  if (!videoUrl) return;
  const filename = path.basename(videoUrl);
  const filepath = path.join(IMAGES_DIR, filename);
  if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
}
