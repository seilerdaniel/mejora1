'use client';

import React from 'react';

export interface DayPlan {
  day: string;
  lunch: string;
  dinner: string;
}

interface DayPlanCardProps {
  item: DayPlan;
  idx: number;
  mounted: boolean;
  onUpdate: (idx: number, field: 'lunch' | 'dinner', value: string) => void;
}

export function DayPlanCard({ item, idx, mounted, onUpdate }: DayPlanCardProps) {
  return (
    <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3.5 space-y-3 shadow-sm transition-all hover:border-zinc-700">
      <span className="text-xs font-mono font-medium text-zinc-100 px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 inline-block">
        {item.day}
      </span>

      <div className="grid grid-cols-1 gap-3 pl-1">
        <div>
          <label className="text-[10px] text-zinc-500 font-mono block mb-1 uppercase tracking-wider">
            Almuerzo
          </label>
          <input
            type="text"
            value={mounted ? item.lunch : ''}
            onChange={(e) => onUpdate(idx, 'lunch', e.target.value)}
            className="w-full bg-zinc-950/50 border border-transparent hover:bg-zinc-950 hover:border-zinc-800 focus:bg-zinc-950 focus:border-zinc-600 rounded-lg px-3 py-2 text-xs text-zinc-200 transition-all focus:outline-none"
          />
        </div>

        <div>
          <label className="text-[10px] text-zinc-500 font-mono block mb-1 uppercase tracking-wider">
            Cena
          </label>
          <input
            type="text"
            value={mounted ? item.dinner : ''}
            onChange={(e) => onUpdate(idx, 'dinner', e.target.value)}
            className="w-full bg-zinc-950/50 border border-transparent hover:bg-zinc-950 hover:border-zinc-800 focus:bg-zinc-950 focus:border-zinc-600 rounded-lg px-3 py-2 text-xs text-zinc-200 transition-all focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}