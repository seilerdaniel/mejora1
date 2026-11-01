'use client';

import React from 'react';
import { TrendingUp } from 'lucide-react';

interface TodayProgressProps {
  habitsProgress?: number;   
  tasksProgress?: number;    
  nutritionProgress?: number;
  workoutProgress?: number;  
}

export function TodayProgress({
  habitsProgress = 75,
  tasksProgress = 60,
  nutritionProgress = 80,
  workoutProgress = 50,
}: TodayProgressProps) {
  const categories = [
    { label: 'Hábitos', val: habitsProgress },
    { label: 'Tareas', val: tasksProgress },
    { label: 'Nutrición', val: nutritionProgress },
    { label: 'Entrenamiento', val: workoutProgress },
  ];

  return (
    <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-5 space-y-4 shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[10px] font-mono font-semibold tracking-wider text-emerald-400 uppercase">
            Tu Progreso de Hoy
          </span>
          <h2 className="text-lg font-bold text-zinc-100 mt-0.5">Vas por buen camino.</h2>
        </div>
        <div className="bg-zinc-800/50 p-2.5 rounded-full text-emerald-400 border border-zinc-700/50">
          <TrendingUp size={18} />
        </div>
      </div>

      <div className="space-y-3.5 pt-1">
        {categories.map((item) => (
          <div key={item.label} className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-zinc-300">{item.label}</span>
              <span className="font-mono text-zinc-400">{item.val}%</span>
            </div>
            <div className="w-full bg-zinc-950 h-1.5 rounded-full overflow-hidden border border-zinc-800/50">
              <div
                className="bg-emerald-400 h-full transition-all duration-500 rounded-full"
                style={{ width: `${item.val}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}