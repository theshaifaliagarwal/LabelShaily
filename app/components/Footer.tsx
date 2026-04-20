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
                <a href="https://www.pinterest.com/LabelShaily" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="hover:text-green-300 transition-colors">
                  <PinterestIcon />
                </a>
                <a href="https://www.youtube.com/@LabelShaily" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-green-300 transition-colors">
                  <YouTubeIcon />
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

function PinterestIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.641 1.267 1.408 0 .858-.546 2.141-.828 3.33-.236.995.499 1.806 1.476 1.806 1.771 0 3.132-1.867 3.132-4.563 0-2.386-1.716-4.054-4.165-4.054-2.837 0-4.5 2.128-4.5 4.328 0 .857.33 1.775.741 2.276a.3.3 0 0 1 .069.286c-.076.311-.243.995-.276 1.134-.044.183-.146.222-.337.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.967-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.522 0 10-4.477 10-10S17.522 2 12 2z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  );
}
