'use client';

import React from 'react';
import { Check } from 'lucide-react';

export interface PrepItem {
  id: string;
  title: string;
  quantity: string;
  completed: boolean;
}

interface BatchCookingItemProps {
  item: PrepItem;
  onToggle: (id: string) => void;
}

export function BatchCookingItem({ item, onToggle }: BatchCookingItemProps) {
  return (
    <button
      onClick={() => onToggle(item.id)}
      className={`w-full text-left flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] ${
        item.completed
          ? 'bg-zinc-950/40 border-zinc-800/40 text-zinc-500 opacity-70'
          : 'bg-zinc-900/60 border-zinc-800 text-zinc-100 hover:border-zinc-600'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all flex-shrink-0 ${
            item.completed
              ? 'bg-zinc-100 border-zinc-100 text-zinc-950'
              : 'border-zinc-600 bg-zinc-950'
          }`}
        >
          {item.completed && <Check size={13} strokeWidth={3} />}
        </div>
        <div>
          <p className={`text-xs font-medium ${item.completed ? 'line-through decoration-zinc-600' : ''}`}>
            {item.title}
          </p>
          <span className="text-[10px] text-zinc-500 font-mono">{item.quantity}</span>
        </div>
      </div>
    </button>
  );
}