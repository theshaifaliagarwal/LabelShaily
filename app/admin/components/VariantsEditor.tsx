'use client';

import { useEffect, useRef, useState } from 'react';
import type { CandleVariant } from '@/app/lib/products';

interface ImageEntry {
  key: string;
  url: string;
  previewUrl: string;
  alt: string;
  isNew: boolean;
}

interface VideoEntry {
  key: string;
  url: string;
  previewUrl: string;
  caption: string;
  isNew: boolean;
}

interface VariantState {
  id: string;
  color: string;
  gradientFrom: string;
  gradientVia: string;
  gradientTo: string;
  images: ImageEntry[];
  deletedUrls: string[];
  videos: VideoEntry[];
  deletedVideoUrls: string[];
}

function makeVariant(): VariantState {
  return {
    id: crypto.randomUUID(),
    color: '',
    gradientFrom: '#fef9c3',
    gradientVia: '#fbbf24',
    gradientTo: '#d97706',
    images: [],
    deletedUrls: [],
    videos: [],
    deletedVideoUrls: [],
  };
}

export default function VariantsEditor({ initialVariants }: { initialVariants?: CandleVariant[] }) {
  const [variants, setVariants] = useState<VariantState[]>(() => {
    if (initialVariants && initialVariants.length > 0) {
      return initialVariants.map((v) => ({
        id: v.id,
        color: v.color,
        gradientFrom: v.gradientFrom,
        gradientVia: v.gradientVia,
        gradientTo: v.gradientTo,
        images: (v.images || []).map((img) => ({
          key: crypto.randomUUID(),
          url: img.url,
          previewUrl: '',
          alt: img.alt,
          isNew: false,
        })),
        deletedUrls: [],
        videos: (v.videos || []).map((vid) => ({
          key: crypto.randomUUID(),
          url: vid.url,
          previewUrl: '',
          caption: vid.caption,
          isNew: false,
        })),
        deletedVideoUrls: [],
      }));
    }
    return [makeVariant()];
  });

  function update(idx: number, patch: Partial<VariantState>) {
    setVariants((prev) => prev.map((v, i) => (i === idx ? { ...v, ...patch } : v)));
  }

  function remove(idx: number) {
    if (variants.length <= 1) return;
    setVariants((prev) => prev.filter((_, i) => i !== idx));
  }

  const variantsData = JSON.stringify(
    variants.map(({ id, color, gradientFrom, gradientVia, gradientTo, images, deletedUrls, videos, deletedVideoUrls }) => ({
      id,
      color,
      gradientFrom,
      gradientVia,
      gradientTo,
      existingImages: images.filter((i) => !i.isNew).map((i) => ({ url: i.url, alt: i.alt })),
      clearedImageUrls: deletedUrls,
      newImages: images.filter((i) => i.isNew).map((i) => ({ key: i.key, alt: i.alt })),
      existingVideos: videos.filter((v) => !v.isNew).map((v) => ({ url: v.url, caption: v.caption })),
      clearedVideoUrls: deletedVideoUrls,
      newVideos: videos.filter((v) => v.isNew).map((v) => ({ key: v.key, caption: v.caption })),
    }))
  );

  return (
    <div>
      <input type="hidden" name="variantsData" value={variantsData} />

      <div className="space-y-4">
        {variants.map((variant, i) => (
          <VariantCard
            key={variant.id}
            variant={variant}
            index={i}
            canRemove={variants.length > 1}
            onUpdate={(patch) => update(i, patch)}
            onRemove={() => remove(i)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => setVariants((prev) => [...prev, makeVariant()])}
        className="mt-4 w-full text-sm text-amber-400 hover:text-amber-300 border border-dashed border-amber-500/30 hover:border-amber-500/60 rounded-xl px-4 py-3 transition-colors flex items-center justify-center gap-2"
      >
        <span className="text-lg leading-none">+</span> Add Colour Variant
      </button>
    </div>
  );
}

function VariantCard({
  variant,
  index,
  canRemove,
  onUpdate,
  onRemove,
}: {
  variant: VariantState;
  index: number;
  canRemove: boolean;
  onUpdate: (patch: Partial<VariantState>) => void;
  onRemove: () => void;
}) {
  const imageFileRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const videoFileRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [pendingImageKey, setPendingImageKey] = useState<string | null>(null);
  const [pendingVideoKey, setPendingVideoKey] = useState<string | null>(null);

  useEffect(() => {
    if (pendingImageKey) {
      imageFileRefs.current[pendingImageKey]?.click();
      setPendingImageKey(null);
    }
  }, [pendingImageKey, variant.images]);

  useEffect(() => {
    if (pendingVideoKey) {
      videoFileRefs.current[pendingVideoKey]?.click();
      setPendingVideoKey(null);
    }
  }, [pendingVideoKey, variant.videos]);

  function addImage() {
    const key = crypto.randomUUID();
    onUpdate({ images: [...variant.images, { key, url: '', previewUrl: '', alt: '', isNew: true }] });
    setPendingImageKey(key);
  }

  function addVideo() {
    const key = crypto.randomUUID();
    onUpdate({ videos: [...variant.videos, { key, url: '', previewUrl: '', caption: '', isNew: true }] });
    setPendingVideoKey(key);
  }

  function handleImageFileChange(key: string, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    onUpdate({ images: variant.images.map((img) => (img.key === key ? { ...img, previewUrl } : img)) });
  }

  function handleVideoFileChange(key: string, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    onUpdate({ videos: variant.videos.map((vid) => (vid.key === key ? { ...vid, previewUrl } : vid)) });
  }

  function removeImage(img: ImageEntry) {
    const newImages = variant.images.filter((i) => i.key !== img.key);
    if (!img.isNew && img.url) {
      onUpdate({ images: newImages, deletedUrls: [...variant.deletedUrls, img.url] });
    } else {
      onUpdate({ images: newImages });
    }
  }

  function removeVideo(vid: VideoEntry) {
    const newVideos = variant.videos.filter((v) => v.key !== vid.key);
    if (!vid.isNew && vid.url) {
      onUpdate({ videos: newVideos, deletedVideoUrls: [...variant.deletedVideoUrls, vid.url] });
    } else {
      onUpdate({ videos: newVideos });
    }
  }

  function updateAlt(key: string, alt: string) {
    onUpdate({ images: variant.images.map((img) => (img.key === key ? { ...img, alt } : img)) });
  }

  function updateCaption(key: string, caption: string) {
    onUpdate({ videos: variant.videos.map((vid) => (vid.key === key ? { ...vid, caption } : vid)) });
  }

  const previewGradient = `linear-gradient(135deg, ${variant.gradientFrom}, ${variant.gradientVia}, ${variant.gradientTo})`;

  return (
    <div className="bg-zinc-800/60 border border-zinc-700/60 rounded-xl p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full border-2 border-zinc-600 shrink-0" style={{ background: previewGradient }} />
          <span className="text-zinc-400 text-sm font-medium">
            Variant {index + 1}{variant.color ? ` — ${variant.color}` : ''}
          </span>
        </div>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-xs text-zinc-500 hover:text-red-400 transition-colors px-2 py-1 rounded-lg hover:bg-red-500/10"
          >
            Remove
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: colour name + gradient */}
        <div className="space-y-3">
          <div>
            <label className="block text-zinc-500 text-xs uppercase tracking-wider mb-1.5">Colour Name</label>
            <input
              type="text"
              value={variant.color}
              onChange={(e) => onUpdate({ color: e.target.value })}
              placeholder="e.g. Soft Purple"
              className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-500 text-zinc-100 placeholder-zinc-600 rounded-xl px-3 py-2 text-sm outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-zinc-500 text-xs uppercase tracking-wider mb-1.5">
              Gradient <span className="normal-case text-zinc-600">(shown when no image)</span>
            </label>
            <div className="flex items-center gap-3">
              {(['gradientFrom', 'gradientVia', 'gradientTo'] as const).map((key, ci) => (
                <div key={key} className="flex flex-col items-center gap-1">
                  <input
                    type="color"
                    value={variant[key]}
                    onChange={(e) => onUpdate({ [key]: e.target.value })}
                    className="w-9 h-9 rounded-lg border border-zinc-700 cursor-pointer bg-transparent p-0.5"
                  />
                  <span className="text-zinc-600 text-xs">{['From', 'Via', 'To'][ci]}</span>
                </div>
              ))}
              <div className="flex-1 h-9 rounded-xl border border-zinc-700" style={{ background: previewGradient }} />
            </div>
          </div>
        </div>

        {/* Right: images + videos */}
        <div className="space-y-4">
          {/* Images */}
          <div>
            <label className="block text-zinc-500 text-xs uppercase tracking-wider mb-2">
              Images <span className="normal-case text-zinc-600">(optional)</span>
            </label>

            {variant.images.filter((img) => img.isNew).map((img) => (
              <input
                key={img.key}
                ref={(el) => { imageFileRefs.current[img.key] = el; }}
                type="file"
                name={`variantNewImage_${variant.id}_${img.key}`}
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageFileChange(img.key, e)}
              />
            ))}

            <div className="space-y-2">
              {variant.images.map((img) => {
                const src = img.isNew ? img.previewUrl : img.url;
                return (
                  <div key={img.key} className="flex items-start gap-3 bg-zinc-900/60 rounded-xl p-2">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-zinc-700 shrink-0 bg-zinc-800">
                      {src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={src} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">selecting…</div>
                      )}
                      <button
                        type="button"
                        onClick={() => removeImage(img)}
                        className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs flex items-center justify-center leading-none"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="flex-1 min-w-0">
                      <label className="block text-zinc-600 text-xs mb-1">Alt text (SEO)</label>
                      <input
                        type="text"
                        value={img.alt}
                        onChange={(e) => updateAlt(img.key, e.target.value)}
                        placeholder={`e.g. ${variant.color || 'Red'} scented candle`}
                        className="w-full bg-zinc-800 border border-zinc-700 focus:border-amber-500 text-zinc-100 placeholder-zinc-600 rounded-lg px-2.5 py-1.5 text-xs outline-none transition-colors"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={addImage}
              className="mt-2 w-full text-xs text-amber-400 hover:text-amber-300 border border-dashed border-amber-500/30 hover:border-amber-500/60 rounded-xl px-3 py-2 transition-colors flex items-center justify-center gap-1.5"
            >
              <span className="text-base leading-none">+</span> Add Image
            </button>
          </div>

          {/* Videos */}
          <div>
            <label className="block text-zinc-500 text-xs uppercase tracking-wider mb-2">
              Videos <span className="normal-case text-zinc-600">(optional)</span>
            </label>

            {variant.videos.filter((vid) => vid.isNew).map((vid) => (
              <input
                key={vid.key}
                ref={(el) => { videoFileRefs.current[vid.key] = el; }}
                type="file"
                name={`variantNewVideo_${variant.id}_${vid.key}`}
                accept="video/*"
                className="hidden"
                onChange={(e) => handleVideoFileChange(vid.key, e)}
              />
            ))}

            <div className="space-y-2">
              {variant.videos.map((vid) => {
                const src = vid.isNew ? vid.previewUrl : vid.url;
                return (
                  <div key={vid.key} className="flex items-start gap-3 bg-zinc-900/60 rounded-xl p-2">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-zinc-700 shrink-0 bg-zinc-800 flex items-center justify-center">
                      {src ? (
                        <video src={src} className="w-full h-full object-cover" muted playsInline />
                      ) : (
                        <div className="text-zinc-600 text-xs text-center px-1">selecting…</div>
                      )}
                      {src && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-6 h-6 rounded-full bg-black/60 flex items-center justify-center text-white text-xs">▶</div>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => removeVideo(vid)}
                        className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs flex items-center justify-center leading-none z-10"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="flex-1 min-w-0">
                      <label className="block text-zinc-600 text-xs mb-1">Caption (optional)</label>
                      <input
                        type="text"
                        value={vid.caption}
                        onChange={(e) => updateCaption(vid.key, e.target.value)}
                        placeholder="e.g. Burning demo"
                        className="w-full bg-zinc-800 border border-zinc-700 focus:border-amber-500 text-zinc-100 placeholder-zinc-600 rounded-lg px-2.5 py-1.5 text-xs outline-none transition-colors"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={addVideo}
              className="mt-2 w-full text-xs text-blue-400 hover:text-blue-300 border border-dashed border-blue-500/30 hover:border-blue-500/60 rounded-xl px-3 py-2 transition-colors flex items-center justify-center gap-1.5"
            >
              <span className="text-base leading-none">▶</span> Add Video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
