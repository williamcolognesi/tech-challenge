'use client';

import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="fixed top-0 left-60 right-0 h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-end z-40">
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="w-5 h-5 text-gray-600" />
        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
      </Button>
    </header>
  );
}
