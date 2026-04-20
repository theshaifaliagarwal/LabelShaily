import { getAllProducts, getProductBySlug } from '@/app/lib/data';

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import VariantSwitcher from '@/app/components/VariantSwitcher';
import LocalhostEditButton from '@/app/components/LocalhostEditButton';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const candle = getProductBySlug(slug);
  if (!candle) return { title: 'Not Found' };

  const colors = candle.variants.map((v) => v.color).filter(Boolean).join(', ');
  const ogImage = candle.variants.find((v) => v.images?.[0]?.url)?.images?.[0]?.url ?? '/logo.jpeg';
  const title = candle.seoTitle || candle.name;
  const description = candle.seoDescription || candle.shortDescription;
  const keywords = candle.seoKeywords
    ? candle.seoKeywords.split(',').map((k) => k.trim())
    : [
        candle.name, candle.scent, candle.material,
        `${candle.name} candle`, `${candle.scent} candle`,
        `${candle.material} candle`, 'handcrafted candle India',
        'buy candles online', 'LabelShaily', colors,
      ].filter(Boolean);

  return {
    title,
    description,
    keywords,
    openGraph: {
      type: 'website',
      url: `https://labelshaily.com/products/${candle.slug}`,
      title: `${title} — LabelShaily`,
      description,
      images: [{ url: ogImage, width: 800, height: 800, alt: `${candle.name} handcrafted candle` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} — LabelShaily`,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const candle = getProductBySlug(slug);
  if (!candle) notFound();

  const others = getAllProducts()
    .filter((c) => c.id !== candle.id)
    .slice(0, 3);

  const waMessage = `Hi! I'm interested in ordering the *${candle.name}* (₹${candle.price}). Can you please help me with the order?`;
  const waUrl = `https://wa.me/919675361488?text=${encodeURIComponent(waMessage)}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: candle.name,
    description: candle.longDescription,
    sku: candle.id,
    brand: { '@type': 'Brand', name: 'LabelShaily' },
    material: candle.material,
    image: candle.variants.flatMap((v) => v.images.map((img) => `https://labelshaily.com${img.url}`)),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: candle.price,
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'LabelShaily' },
    },
  };

  return (
    <div className="min-h-screen bg-[#faf6ef]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-6 pt-8 pb-2">
        <nav className="text-sm text-green-700/50 flex items-center gap-2">
          <Link href="/" className="hover:text-green-700 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#products" className="hover:text-green-700 transition-colors">Collection</Link>
          <span>/</span>
          <span className="text-green-800">{candle.name}</span>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: variant image switcher */}
          <VariantSwitcher variants={candle.variants} productName={candle.name} />

          {/* Right: product info */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-green-600 tracking-[0.25em] uppercase text-xs font-light">
                {candle.scent}
              </p>
              <LocalhostEditButton productId={candle.id} />
            </div>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-green-900 mb-4">
              {candle.name}
            </h1>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-3xl font-bold text-green-700">₹{candle.price}</span>
              <span className="text-green-700/40 text-sm">Incl. of all taxes</span>
            </div>
            <p className="text-green-800/60 text-sm mb-6">Pan India shipping • WhatsApp us for details</p>

            <p className="text-green-800/70 leading-relaxed mb-8 text-base whitespace-pre-line">
              {candle.longDescription}
            </p>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: 'Weight', value: candle.weight },
                {
                  label: 'Dimensions',
                  value: `${candle.dimensions.length} × ${candle.dimensions.width} × ${candle.dimensions.height} cm`,
                },
                { label: 'Material', value: candle.material },
                { label: 'Scent', value: candle.scent },
                {
                  label: 'Colours',
                  value: candle.variants.map((v) => v.color).filter(Boolean).join(', ') || '—',
                },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white rounded-xl px-4 py-3 border border-green-100 shadow-sm">
                  <p className="text-green-600/60 text-xs uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-green-900 font-semibold text-sm">{value}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-full hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg hover:shadow-amber-500/30 hover:scale-105 active:scale-95"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Order on WhatsApp
              </a>
              <Link
                href="/#products"
                className="flex items-center justify-center px-8 py-4 border border-green-400/40 text-green-700 font-semibold rounded-full hover:bg-green-50 transition-all hover:scale-105 active:scale-95"
              >
                ← Back to Collection
              </Link>
            </div>
          </div>
        </div>

        {/* You may also like */}
        {others.length > 0 && (
          <div className="mt-24">
            <h2 className="font-playfair text-2xl font-bold text-green-900 mb-8 text-center">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {others.map((c) => {
                const pv = c.variants[0];
                return (
                  <Link
                    key={c.id}
                    href={`/products/${c.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-green-100"
                  >
                    {pv?.images?.[0]?.url ? (
                      <div className="relative overflow-hidden bg-[#faf6ef] aspect-square">
                        <Image
                          src={pv.images[0].url}
                          alt={pv.images[0].alt || c.name}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="33vw"
                        />
                      </div>
                    ) : (
                      <div
                        className="h-40 flex items-center justify-center relative overflow-hidden"
                        style={{
                          background: `linear-gradient(160deg, ${pv?.gradientFrom ?? '#fef9c3'}, ${pv?.gradientVia ?? '#fbbf24'}, ${pv?.gradientTo ?? '#d97706'})`,
                        }}
                      >
                        <div className="relative">
                          <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-3 h-5 card-flame-outer" />
                          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-1.5 h-3 card-flame-inner" />
                          <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-amber-900/70" />
                          <div
                            className="w-12 h-14 rounded-xl border border-white/30"
                            style={{
                              background: `linear-gradient(180deg, ${pv?.gradientFrom ?? '#fef9c3'}cc, ${pv?.gradientTo ?? '#d97706'})`,
                            }}
                          />
                        </div>
                      </div>
                    )}
                    <div className="p-4">
                      <p className="font-playfair font-bold text-green-900 group-hover:text-green-700 transition-colors">
                        {c.name}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-green-700 font-semibold text-sm">₹{c.price}</p>
                        {c.variants.length > 1 && (
                          <div className="flex gap-1">
                            {c.variants.slice(0, 3).map((v) => (
                              <div
                                key={v.id}
                                className="w-3 h-3 rounded-full border border-green-200"
                                style={{ background: `linear-gradient(135deg, ${v.gradientFrom}, ${v.gradientTo})` }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
