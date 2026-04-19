'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { CandleVariant } from '@/app/lib/products';

type MediaItem =
  | { type: 'image'; url: string; label: string }
  | { type: 'video'; url: string; label: string };

function CandleArt({ variant }: { variant: CandleVariant }) {
  return (
    <>
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(ellipse at 50% 40%, ${variant.gradientVia}, transparent 70%)`,
        }}
      />
      <div className="relative z-10 product-candle-wrapper">
        <div
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full blur-2xl opacity-60"
          style={{ background: '#fbbf24' }}
        />
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-8 h-14 hero-flame-outer" />
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-4 h-9 hero-flame-inner" />
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-amber-900" />
        <div
          className="w-32 h-40 rounded-2xl shadow-2xl relative overflow-hidden border-2 border-white/30"
          style={{
            background: `linear-gradient(180deg, ${variant.gradientFrom}cc 0%, ${variant.gradientVia}ee 50%, ${variant.gradientTo} 100%)`,
          }}
        >
          <div className="absolute top-0 left-3 w-4 h-full bg-white/20 rounded-full" />
          <div className="absolute top-2 right-4 w-2 h-16 bg-white/10 rounded-full" />
          <div className="absolute top-0 inset-x-0 h-4 rounded-t-2xl" style={{ background: variant.gradientFrom }} />
          <div className="absolute bottom-4 inset-x-4 h-10 rounded-lg bg-white/15 border border-white/20" />
        </div>
        <div
          className="w-40 h-3 rounded-full mt-1 mx-auto opacity-60"
          style={{ background: `linear-gradient(90deg, ${variant.gradientVia}, ${variant.gradientTo})` }}
        />
      </div>
    </>
  );
}

export default function VariantSwitcher({
  variants,
  productName,
}: {
  variants: CandleVariant[];
  productName: string;
}) {
  const [selected, setSelected] = useState(0);
  const [mediaIdx, setMediaIdx] = useState(0);

  const variant = variants[selected];

  const allMedia: MediaItem[] = [
    ...(variant.images || []).map((img) => ({ type: 'image' as const, url: img.url, label: img.alt || `${productName} — ${variant.color}` })),
    ...(variant.videos || []).map((vid) => ({ type: 'video' as const, url: vid.url, label: vid.caption || `${productName} video` })),
  ];

  const currentMedia = allMedia[mediaIdx] ?? null;

  function selectVariant(i: number) {
    setSelected(i);
    setMediaIdx(0);
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Main visual */}
      {currentMedia?.type === 'image' ? (
        <div className="rounded-3xl overflow-hidden shadow-2xl bg-[#faf6ef]">
          <Image
            src={currentMedia.url}
            alt={currentMedia.label}
            width={800}
            height={800}
            style={{ width: '100%', height: 'auto' }}
            className="block transition-opacity duration-500"
            priority
          />
        </div>
      ) : currentMedia?.type === 'video' ? (
        <div className="rounded-3xl overflow-hidden shadow-2xl bg-black">
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            key={currentMedia.url}
            src={currentMedia.url}
            controls
            autoPlay
            loop
            playsInline
            className="w-full block"
          />
        </div>
      ) : (
        <div
          className="relative rounded-3xl overflow-hidden h-[420px] flex items-center justify-center shadow-2xl"
          style={{
            background: `linear-gradient(160deg, ${variant.gradientFrom} 0%, ${variant.gradientVia} 55%, ${variant.gradientTo} 100%)`,
          }}
        >
          <CandleArt variant={variant} />
        </div>
      )}

      {/* Media strip — images + videos together */}
      {allMedia.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {allMedia.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setMediaIdx(i)}
              title={item.label}
              className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all duration-200 ${
                i === mediaIdx
                  ? 'border-amber-500 shadow-lg shadow-amber-400/20'
                  : 'border-transparent hover:border-amber-300/50'
              }`}
            >
              {item.type === 'image' ? (
                <Image
                  src={item.url}
                  alt={item.label}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              ) : (
                <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-amber-500/80 flex items-center justify-center text-white text-xs">
                    ▶
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Colour picker row — only shown when more than 1 variant */}
      {variants.length > 1 && (
        <div className="flex flex-col gap-2">
          <p className="text-sm text-amber-700/60 font-medium">
            Colour:{' '}
            <span className="text-amber-800 font-semibold">{variant.color}</span>
          </p>
          <div className="flex flex-wrap gap-2.5">
            {variants.map((v, i) => {
              const thumb = v.images?.[0];
              return (
                <button
                  key={v.id}
                  type="button"
                  title={v.color}
                  onClick={() => selectVariant(i)}
                  className={`relative w-9 h-9 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                    i === selected
                      ? 'border-amber-500 scale-110 shadow-lg shadow-amber-400/20'
                      : 'border-transparent hover:border-amber-300/50'
                  }`}
                  style={{
                    background: thumb
                      ? undefined
                      : `linear-gradient(135deg, ${v.gradientFrom}, ${v.gradientVia}, ${v.gradientTo})`,
                  }}
                >
                  {thumb && (
                    <Image
                      src={thumb.url}
                      alt={v.color}
                      fill
                      className="object-cover rounded-full"
                      sizes="36px"
                    />
                  )}
                  {i === selected && (
                    <span className="absolute inset-0 rounded-full ring-2 ring-amber-500 ring-offset-2 ring-offset-[#faf6ef]" />
                  )}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2 mt-0.5">
            {variants.map((v, i) => (
              <span
                key={v.id}
                className={`text-xs transition-colors ${
                  i === selected ? 'text-amber-700' : 'text-amber-700/40'
                }`}
              >
                {v.color}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
