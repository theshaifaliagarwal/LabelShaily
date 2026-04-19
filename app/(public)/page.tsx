import type { Metadata } from 'next';
import HeroSection from '@/app/components/HeroSection';
import ProductCard from '@/app/components/ProductCard';
import AnimatedSection from '@/app/components/AnimatedSection';
import TestimonialsCarousel from '@/app/components/TestimonialsCarousel';
import { getAllProducts } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'LabelShaily — Handcrafted Candles',
  description: 'Browse our full collection of premium handcrafted candles — soy wax, gel wax, coconut wax & beeswax. Beautifully scented, hand-poured in small batches.',
  keywords: [
    'buy candles online India', 'scented candles', 'handmade candles', 'soy candles',
    'coconut wax candles', 'gel wax candles', 'candle shop India', 'LabelShaily collection',
    'home décor candles', 'aromatic candles India',
  ],
  openGraph: {
    type: 'website',
    url: 'https://labelshaily.com',
    title: 'LabelShaily — Handcrafted Candles Collection',
    description: 'Browse our full collection of premium handcrafted candles.',
    images: [{ url: '/logo.jpeg', width: 400, height: 400, alt: 'LabelShaily Candles' }],
  },
};

export default function Home() {
  const candles = getAllProducts();

  return (
    <>
      <HeroSection />

      {/* Feature strip */}
      <section className="bg-green-800 py-10 px-6">
        <AnimatedSection>
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 text-center">
            {[
              { icon: '🌿', title: 'Natural Ingredients', desc: 'Pure soy, coconut & beeswax' },
              { icon: '🕯️', title: 'Hand-Poured', desc: 'Crafted in small batches with care' },
              { icon: '✨', title: 'Premium Scents', desc: 'Curated fragrance oils & essential oils' },
              { icon: '🌱', title: 'Eco-Friendly', desc: 'Sustainable materials & packaging' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center gap-1">
                <span className="text-3xl mb-1">{icon}</span>
                <span className="text-white font-semibold text-sm">{title}</span>
                <span className="text-green-200/70 text-xs">{desc}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Products */}
      <section id="products" className="max-w-6xl mx-auto px-6 py-20">
        <AnimatedSection>
          <div className="text-center mb-14">
            <p className="text-green-600 tracking-[0.3em] uppercase text-xs font-light mb-3">Our Collection</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-green-900 mb-4">Handcrafted Candles</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto mb-4" />
            <p className="text-green-800/60 max-w-lg mx-auto text-sm leading-relaxed">
              Each candle is lovingly made in small batches using the finest natural ingredients. Find your perfect scent.
            </p>
          </div>
        </AnimatedSection>

        {candles.length === 0 ? (
          <p className="text-center text-green-700/50 py-16">No products yet. Add some via the admin panel.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {candles.map((candle, i) => (
              <AnimatedSection key={candle.id} delay={i * 100}>
                <ProductCard candle={candle} />
              </AnimatedSection>
            ))}
          </div>
        )}
      </section>

      {/* Story */}
      <section id="about" className="bg-gradient-to-br from-green-900 to-green-800 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <p className="text-green-400/80 tracking-[0.3em] uppercase text-xs font-light mb-4">Our Story</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">Made with Intention</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto mb-8" />
            <p className="text-green-100/80 text-lg leading-relaxed mb-6">
              LabelShaily was born from a deep love of creating meaningful moments at home. Every candle we make is hand-poured with care, using only natural waxes and the finest fragrance oils sourced from around the world.
            </p>
            <p className="text-green-200/60 leading-relaxed max-w-2xl mx-auto">
              We believe a candle is more than just light — it&apos;s a ritual, a mood, a memory. From the delicate scent of rose to the warm glow of fairy lights, our candles are designed to transform your space and elevate your everyday.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-[#f0f7f4]">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="font-playfair text-3xl font-bold text-green-900 mb-2">What People Say</h2>
              <div className="w-12 h-0.5 bg-green-500 mx-auto mt-3" />
            </div>
          </AnimatedSection>
          <TestimonialsCarousel />
        </div>
      </section>
    </>
  );
}
