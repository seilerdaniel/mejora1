'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Utensils, Calendar, Target } from 'lucide-react';

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Hoy', icon: Home },
    { href: '/food', label: 'Comidas', icon: Utensils },
    { href: '/planner', label: 'Menú', icon: Calendar },
    { href: '/goals', label: 'Metas', icon: Target }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-zinc-950/90 backdrop-blur-md border-t border-zinc-800/80 z-40 md:static md:bg-transparent md:border-none md:mt-8 md:mb-8 md:max-w-4xl md:mx-auto">
      <div className="max-w-md mx-auto flex items-center justify-around py-2 px-3 md:bg-zinc-900/80 md:backdrop-blur-lg md:border md:border-zinc-800 md:rounded-2xl md:py-3 md:shadow-xl md:max-w-xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-colors ${
                isActive ? 'text-emerald-400 font-medium md:bg-zinc-800' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Icon size={18} />
              <span className="text-[10px] font-mono">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}