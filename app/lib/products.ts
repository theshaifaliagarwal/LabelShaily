export interface CandleImage {
  url: string;
  alt: string;
}

export interface CandleVideo {
  url: string;
  caption: string;
}

export interface CandleVariant {
  id: string;
  color: string;
  gradientFrom: string;
  gradientVia: string;
  gradientTo: string;
  images: CandleImage[];
  videos: CandleVideo[];
  // Legacy fields — present in old JSON records, normalized on read in data.ts
  imageUrl?: string;
  imageAlt?: string;
}

export interface Candle {
  id: string;
  slug: string;
  name: string;
  price: number;
  weight: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  shortDescription: string;
  longDescription: string;
  scent: string;
  material: string;
  variants: CandleVariant[];
  order?: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}
