import Link from 'next/link';
import Image from 'next/image';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-inter flex flex-col">
      {/* Top bar */}
      <header className="bg-zinc-900 border-b border-zinc-800 px-6 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-[#faf0e6] shrink-0 shadow-md">
            <Image
              src="/logo.jpeg"
              alt="LabelShaily logo"
              width={40}
              height={40}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-playfair font-bold text-amber-100 text-sm">LabelShaily</span>
            <span className="text-zinc-500 text-xs uppercase tracking-widest">Admin</span>
          </div>
        </div>

        <nav className="flex items-center gap-2">
          <Link href="/admin" className="text-sm text-zinc-400 hover:text-zinc-100 px-3 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors">
            Products
          </Link>
          <Link href="/admin/add" className="text-sm bg-amber-500 hover:bg-amber-400 text-white px-4 py-1.5 rounded-lg transition-colors font-medium">
            + Add Product
          </Link>
          <Link href="/" target="_blank" className="text-sm text-zinc-500 hover:text-zinc-300 px-3 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors">
            View Site ↗
          </Link>
        </nav>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
