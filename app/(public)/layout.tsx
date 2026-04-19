import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import FloatingContacts from '@/app/components/FloatingContacts';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#faf6ef] text-amber-950 font-inter min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
      <FloatingContacts />
    </div>
  );
}
