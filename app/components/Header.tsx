import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-green-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center group">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-[#faf0e6] shrink-0 shadow-md group-hover:shadow-green-400/20 transition-shadow">
            <Image
              src="/logo.jpeg"
              alt="LabelShaily logo"
              width={56}
              height={56}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: 'Home', href: '/' },
            { label: 'Collection', href: '/#products' },
            { label: 'About', href: '/#about' },
            { label: 'Contact', href: '/#contact' },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-green-800/70 hover:text-green-900 text-sm tracking-widest uppercase transition-colors font-light"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
