'use client';

import React from 'react';
import { Target, Trash2, TrendingUp, Pencil } from 'lucide-react';
import { Goal } from '@/types';

interface GoalCardProps {
  goal: Goal;
  onUpdateProgress: (id: number, newValue: number) => void;
  onEdit: (goal: Goal) => void;
  onDelete: (id: number) => void;
}

export function GoalCard({ goal, onUpdateProgress, onEdit, onDelete }: GoalCardProps) {
  // Cálculo del progreso. Asumimos que si el valor actual llega o supera la meta, es 100%.
  const isPositiveProgress = goal.targetValue > goal.currentValue; 
  // Si la meta es bajar (ej: de 80 a 75), el progreso inicial es 0%.
  // Si la meta es subir (ej: de 0 a 10 dominadas), calculamos el porcentaje.
  
  let progress = 0;
  if (goal.targetValue === goal.currentValue) {
    progress = 100;
  } else if (isPositiveProgress) {
    // Ej: Estoy en 80kg, quiero 75kg. Si no hay valor inicial, esto es complejo.
    // Simplificación: Progreso = (Actual / Meta) * 100 en aumentos.
    progress = Math.min(Math.round((goal.currentValue / goal.targetValue) * 100), 100);
  } else {
    // Para metas de reducción, es un poco más abstracto. 
    // Si la meta es menor, mostramos un progreso visual basado en la cercanía.
    progress = Math.min(Math.round((goal.targetValue / goal.currentValue) * 100), 100); 
  }

  const handleQuickUpdate = () => {
    const newVal = prompt(`Actualizar "${goal.title}" (Actual: ${goal.currentValue} ${goal.unit})`, goal.currentValue.toString());
    if (newVal !== null && !isNaN(Number(newVal))) {
      onUpdateProgress(goal.id!, Number(newVal));
    }
  };

  return (
    <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4 shadow-lg space-y-3 group hover:border-zinc-700 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-500/10 p-1.5 rounded-md text-emerald-400 border border-emerald-500/20">
            <Target size={16} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-zinc-100">{goal.title}</h3>
            <span className="text-[10px] text-zinc-500 font-mono">
              {goal.currentValue} {goal.unit} / {goal.targetValue} {goal.unit}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(goal)} className="text-zinc-500 hover:text-blue-400 p-1">
            <Pencil size={14} />
          </button>
          <button onClick={() => goal.id && onDelete(goal.id)} className="text-zinc-500 hover:text-red-400 p-1">
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-[10px] font-mono text-zinc-400">
          <span>Progreso</span>
          <span className="text-emerald-400 font-bold">{progress}%</span>
        </div>
        <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-800/50">
          <div
            className="bg-emerald-400 h-full transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <button
        onClick={handleQuickUpdate}
        className="w-full mt-2 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/50 text-zinc-300 text-xs py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1.5"
      >
        <TrendingUp size={14} /> Actualizar Progreso
      </button>
    </div>
  );
}