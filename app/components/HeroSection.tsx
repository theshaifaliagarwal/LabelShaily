'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-green-50 to-emerald-50">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-green-200/50 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-emerald-100/60 blur-3xl" />
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-green-100/60 blur-3xl" />
      </div>

      {/* Decorative dots grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #16a34a 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Logo image */}
        <div
          className={`flex justify-center mb-10 transition-all duration-1000 ease-out ${
            loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
        >
          <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden shadow-2xl ring-4 ring-green-100 ring-offset-4 ring-offset-white">
            <Image
              src="/logo.jpeg"
              alt="LabelShaily"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 144px, 176px"
            />
          </div>
        </div>

        {/* Pre-title */}
        <p
          className={`text-green-600/80 tracking-[0.3em] uppercase text-xs font-light mb-4 transition-all duration-700 delay-300 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Handcrafted with love
        </p>

        {/* Main title */}
        <h1
          className={`font-playfair text-5xl md:text-7xl font-bold text-green-900 leading-tight mb-6 transition-all duration-700 delay-500 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Illuminate Your
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-400">
            World
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-green-700/70 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-10 font-light transition-all duration-700 delay-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Premium handcrafted candles made from natural wax and the finest fragrances. Bring warmth, serenity, and beauty to every corner of your home.
        </p>

        {/* CTA */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-[900ms] ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Link
            href="#products"
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-full hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg hover:shadow-amber-500/30 hover:scale-105 active:scale-95"
          >
            Shop Collection
          </Link>
          <Link
            href="#about"
            className="px-8 py-4 border border-green-400/40 text-green-700 font-semibold rounded-full hover:bg-green-100/50 transition-all hover:scale-105 active:scale-95"
          >
            Our Story
          </Link>
        </div>

        {/* Scroll indicator */}
        <div
          className={`mt-16 flex justify-center transition-all duration-700 delay-[1100ms] ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex flex-col items-center gap-2 text-green-500/50 text-xs tracking-widest uppercase">
            <span>Scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-green-400/50 to-transparent animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
