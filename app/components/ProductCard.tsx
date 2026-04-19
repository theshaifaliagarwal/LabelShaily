import Link from 'next/link';
import Image from 'next/image';
import type { Candle } from '@/app/lib/products';

const ColorDots = ({ candle }: { candle: Candle }) =>
  candle.variants.length > 1 ? (
    <div className="absolute bottom-3 right-3 flex gap-1.5">
      {candle.variants.slice(0, 4).map((v) => (
        <div
          key={v.id}
          className="w-3.5 h-3.5 rounded-full border border-white/60 shadow-sm"
          style={{
            background: v.images?.[0]?.url
              ? undefined
              : `linear-gradient(135deg, ${v.gradientFrom}, ${v.gradientTo})`,
          }}
          title={v.color}
        />
      ))}
      {candle.variants.length > 4 && (
        <div className="w-3.5 h-3.5 rounded-full border border-white/60 bg-white/30 flex items-center justify-center">
          <span className="text-white text-[7px] font-bold leading-none">+{candle.variants.length - 4}</span>
        </div>
      )}
    </div>
  ) : null;

export default function ProductCard({ candle }: { candle: Candle }) {
  const primary = candle.variants[0];
  const extraCount = candle.variants.length - 1;

  return (
    <Link href={`/products/${candle.slug}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-400 hover:-translate-y-2 border border-amber-100/50">
        {/* Visual — natural height when image, fixed height for gradient art */}
        {primary?.images?.[0]?.url ? (
          <div className="relative overflow-hidden bg-[#faf6ef] aspect-square">
            <Image
              src={primary.images[0].url}
              alt={primary.images[0].alt || `${candle.name} — ${primary.color} handcrafted candle`}
              fill
              style={{ objectFit: 'cover' }}
              className="group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <ColorDots candle={candle} />
          </div>
        ) : (
          <div
            className="relative h-56 overflow-hidden flex items-center justify-center"
            style={{
              background: `linear-gradient(160deg, ${primary?.gradientFrom ?? '#fef9c3'} 0%, ${primary?.gradientVia ?? '#fbbf24'} 50%, ${primary?.gradientTo ?? '#d97706'} 100%)`,
            }}
          >
            <div className="absolute inset-0 bg-white/5" />
            <div className="relative z-10">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-amber-300/40 blur-md group-hover:scale-125 transition-transform duration-500" />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-4 h-7 card-flame-outer" />
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-2 h-4 card-flame-inner" />
              <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-amber-900/70" />
              <div
                className="w-20 h-24 rounded-xl shadow-2xl relative overflow-hidden border-2 border-white/30"
                style={{
                  background: `linear-gradient(180deg, ${primary?.gradientFrom ?? '#fef9c3'}cc 0%, ${primary?.gradientVia ?? '#fbbf24'}ee 50%, ${primary?.gradientTo ?? '#d97706'} 100%)`,
                }}
              >
                <div className="absolute top-0 left-1 w-3 h-full bg-white/20 rounded-full" />
                <div className="absolute top-0 inset-x-0 h-3 rounded-t-xl" style={{ background: primary?.gradientFrom }} />
              </div>
            </div>
            <ColorDots candle={candle} />
          </div>
        )}

        {/* Info */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-playfair text-lg font-bold text-green-900 group-hover:text-green-700 transition-colors">
              {candle.name}
            </h3>
            <span className="text-green-700 font-bold text-lg">₹{candle.price}</span>
          </div>
          <p className="text-green-800/60 text-sm leading-relaxed mb-4 line-clamp-2">{candle.shortDescription}</p>

          <div className="flex gap-2 flex-wrap mb-3">
            <Pill label={candle.weight} />
            {extraCount > 0 && (
              <Pill label={`${candle.variants.length} colours`} highlight />
            )}
          </div>

          <div className="pt-3 border-t border-green-100 flex items-center justify-between">
            <span className="text-xs text-green-600/70 italic">{candle.scent}</span>
            <span className="text-xs font-medium text-green-700 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              View details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function Pill({ label, highlight }: { label: string; highlight?: boolean }) {
  return (
    <span
      className={`text-xs px-2.5 py-1 rounded-full border ${
        highlight
          ? 'bg-green-100 text-green-700 border-green-200'
          : 'bg-green-50 text-green-700 border-green-100'
      }`}
    >
      {label}
    </span>
  );
}
