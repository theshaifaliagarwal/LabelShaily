import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer id="contact" className="bg-green-950 text-green-200/60 pt-16 pb-8 mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-[#faf0e6] shrink-0 shadow-lg">
                <Image
                  src="/logo.jpeg"
                  alt="LabelShaily logo"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-playfair text-lg font-bold text-white leading-tight">
                Label<br />
                <span className="text-green-400">Shaily</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Handcrafted candles made with love, natural wax, and premium fragrances. Bringing warmth and serenity to every home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-green-300 font-semibold mb-4 tracking-wider uppercase text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Our Collection', href: '/#products' },
                { label: 'About Us', href: '/#about' },
                { label: 'Shipping Policy', href: '#' },
                { label: 'Return Policy', href: '#' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-green-300 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div id="about">
            <h4 className="text-green-300 font-semibold mb-4 tracking-wider uppercase text-sm">Get in Touch</h4>
            <div className="space-y-2 text-sm">
              <p>+91 96753 61488</p>
              <div className="flex gap-4 mt-4">
                <a href="https://www.instagram.com/labelshaily/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-green-300 transition-colors">
                  <InstagramIcon />
                </a>
                <a href="https://www.facebook.com/share/18ienyqFyr/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-green-300 transition-colors">
                  <FacebookIcon />
                </a>
                <a href="https://wa.me/919675361488" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-green-300 transition-colors">
                  <WhatsAppIcon />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-green-900/50 pt-6 text-center text-xs text-green-200/30">
          <p>© {new Date().getFullYear()} LabelShaily. All rights reserved. Made with ♥ and natural wax.</p>
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}
