'use client';

import React from 'react';
import { Flame, Beef, Wheat, Droplet, Settings } from 'lucide-react';

interface MacroTargets {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface NutritionSummaryProps {
  targets: MacroTargets | null;
  consumed: MacroTargets;
  onOpenProfile: () => void;
}

export function NutritionSummary({ targets, consumed, onOpenProfile }: NutritionSummaryProps) {
  if (!targets) {
    return (
      <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-5 shadow-lg flex items-center justify-between h-full">
        <div>
          <span className="text-xs font-medium tracking-wider text-zinc-400 uppercase block mb-1">Nutrición Diaria</span>
          <p className="text-xs text-zinc-500">Configura tu perfil para ver tus macros.</p>
        </div>
        <button onClick={onOpenProfile} className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 p-2 rounded-lg transition-colors border border-zinc-700/50">
          <Settings size={18} />
        </button>
      </div>
    );
  }

  // Función auxiliar para calcular el porcentaje de la barra
  const getPercent = (current: number, target: number) => {
    if (target === 0) return 0;
    return Math.min(Math.round((current / target) * 100), 100);
  };

  return (
    <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-5 shadow-lg h-full flex flex-col justify-between">
      
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium tracking-wider text-zinc-400 uppercase">Metas Diarias</span>
          <button onClick={onOpenProfile} className="text-zinc-500 hover:text-zinc-300 transition-colors" title="Editar Perfil">
            <Settings size={16} />
          </button>
        </div>

        {/* Calorías */}
        <div className="mb-3 bg-zinc-950/50 p-2.5 rounded-lg border border-zinc-800/50">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <Flame size={14} className="text-orange-400" />
              <span className="text-[10px] text-zinc-400 font-mono uppercase">Calorías</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-300">
              <strong className="text-orange-400">{consumed.calories}</strong> / {targets.calories}
            </span>
          </div>
          <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-orange-400 h-full rounded-full transition-all duration-500" 
              style={{ width: `${getPercent(consumed.calories, targets.calories)}%` }} 
            />
          </div>
        </div>

        {/* Macros */}
        <div className="grid grid-cols-3 gap-2">
          {/* Proteína */}
          <div className="bg-zinc-950/50 p-2 rounded-lg border border-zinc-800/50">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Beef size={12} className="text-red-400" />
              <span className="text-[9px] text-zinc-400 font-mono">Prot</span>
            </div>
            <div className="text-center text-[10px] font-mono text-zinc-300 mb-1">
              <strong className="text-red-400">{consumed.protein}</strong>/{targets.protein}g
            </div>
            <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
              <div 
                className="bg-red-400 h-full rounded-full transition-all duration-500" 
                style={{ width: `${getPercent(consumed.protein, targets.protein)}%` }} 
              />
            </div>
          </div>

          {/* Carbos */}
          <div className="bg-zinc-950/50 p-2 rounded-lg border border-zinc-800/50">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Wheat size={12} className="text-amber-400" />
              <span className="text-[9px] text-zinc-400 font-mono">Carbs</span>
            </div>
            <div className="text-center text-[10px] font-mono text-zinc-300 mb-1">
              <strong className="text-amber-400">{consumed.carbs}</strong>/{targets.carbs}g
            </div>
            <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
              <div 
                className="bg-amber-400 h-full rounded-full transition-all duration-500" 
                style={{ width: `${getPercent(consumed.carbs, targets.carbs)}%` }} 
              />
            </div>
          </div>

          {/* Grasas */}
          <div className="bg-zinc-950/50 p-2 rounded-lg border border-zinc-800/50">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Droplet size={12} className="text-blue-400" />
              <span className="text-[9px] text-zinc-400 font-mono">Gras</span>
            </div>
            <div className="text-center text-[10px] font-mono text-zinc-300 mb-1">
              <strong className="text-blue-400">{consumed.fats}</strong>/{targets.fats}g
            </div>
            <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
              <div 
                className="bg-blue-400 h-full rounded-full transition-all duration-500" 
                style={{ width: `${getPercent(consumed.fats, targets.fats)}%` }} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}