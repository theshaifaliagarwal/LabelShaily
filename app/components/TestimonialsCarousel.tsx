'use client';

import { useState } from 'react';

const testimonials = [
  { quote: 'The Wine Candle is absolutely divine. My living room smells like a luxury spa every evening — I\'ve already ordered three more!', name: 'Deepanshu Singhal', location: 'Bangalore' },
  { quote: 'The LumiGlow Fairy Light Candle is pure magic. The fairy lights combined with the real flame create the most cozy ambiance. My favourite purchase this year.', name: 'Shivangi Agarwal', location: 'Noida' },
  { quote: 'Gifted the Wine Candle to my sister and she was stunned — she couldn\'t believe it was actually a candle. The packaging was beautiful too!', name: 'Pratibha', location: 'Bulandshahr' },
  { quote: 'The gel wax is so unique and the rose fragrance is not overpowering at all. Very elegant and long-lasting. Will definitely buy again.', name: 'Rachana', location: 'Anupshahr' },
  { quote: 'Ordered the LumiGlow candle for my mom\'s birthday and she absolutely loved it. The quality is outstanding and delivery was super fast.', name: 'Amit Thakur', location: 'Bihar' },
  { quote: 'I love how these candles look exactly like a wine glass. Such a creative idea! The vanilla scent from LumiGlow is so soothing.', name: 'Prachi B.', location: 'Bangalore' },
  { quote: 'Amazing craftsmanship. You can see the love and effort that goes into each candle. The gel wax with the wine design is truly one-of-a-kind.', name: 'Gaurav Goyal', location: 'Jaipur' },
  { quote: 'I bought two Wine Candles as wedding gifts and both guests were blown away. LabelShaily has found a permanent customer in me!', name: 'Neha', location: 'Indore' },
  { quote: 'The LumiGlow candle makes my bedroom look like a dream. That warm fairy light glow with the vanilla scent is perfect for winding down.', name: 'Aditya', location: 'Telangana' },
];

const PER_PAGE = 3;

export default function TestimonialsCarousel() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(testimonials.length / PER_PAGE);
  const visible = testimonials.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[280px]">
        {visible.map((t, i) => (
          <div key={page * PER_PAGE + i} className="bg-white rounded-2xl p-6 shadow-sm border border-green-100 hover:shadow-md transition-shadow flex flex-col">
            <div className="text-amber-400 text-lg mb-3">★★★★★</div>
            <p className="text-green-900/70 text-sm leading-relaxed italic mb-4 flex-1">&ldquo;{t.quote}&rdquo;</p>
            <div className="border-t border-green-100 pt-3">
              <p className="text-green-800 font-semibold text-sm">{t.name}</p>
              <p className="text-green-500/70 text-xs">{t.location}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 0}
          className="w-10 h-10 rounded-full border border-green-200 flex items-center justify-center text-green-700 hover:bg-green-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous reviews"
        >
          ←
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === page ? 'bg-green-600' : 'bg-green-200 hover:bg-green-300'
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages - 1}
          className="w-10 h-10 rounded-full border border-green-200 flex items-center justify-center text-green-700 hover:bg-green-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Next reviews"
        >
          →
        </button>
      </div>

      <p className="text-center text-green-500/50 text-xs mt-3">
        {page * PER_PAGE + 1}–{Math.min((page + 1) * PER_PAGE, testimonials.length)} of {testimonials.length} reviews
      </p>
    </div>
  );
}
