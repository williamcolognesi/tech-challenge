import { Sidebar } from '@/components/layout/sidebar';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Sidebar />
      <main className="hidden md:block md:ml-60 p-6">
        {children}
      </main>
      <main className="md:hidden pt-20 px-4 pb-6">
        {children}
      </main>
    </div>
  );
}
