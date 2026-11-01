'use client';

import React from 'react';
import { Check, Flame, Pencil, Trash2 } from 'lucide-react';
import { Habit } from '@/types';

interface HabitItemProps {
  habit: Habit;
  onToggle: (id: string) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (id: string) => void;
}

export function HabitItem({ habit, onToggle, onEdit, onDelete }: HabitItemProps) {
  return (
    // Añadimos "group" para controlar el hover de los hijos
    <div
      className={`group w-full flex items-center justify-between p-2.5 rounded-lg border transition-all ${
        habit.completed
          ? 'bg-zinc-950/40 border-zinc-800/30 opacity-70'
          : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
      }`}
    >
      {/* Zona clickeable para Toggle */}
      <button
        onClick={() => onToggle(habit.id)}
        className="flex items-center gap-3 flex-1 text-left cursor-pointer min-w-0 pr-2"
      >
        <div
          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all flex-shrink-0 ${
            habit.completed
              ? 'bg-zinc-100 border-zinc-100 text-zinc-950'
              : 'border-zinc-600 bg-zinc-950 group-hover:border-zinc-500'
          }`}
        >
          {habit.completed && <Check size={13} strokeWidth={3} />}
        </div>
        
        <div className="flex flex-col items-start min-w-0">
          <p className={`text-sm font-medium truncate w-full ${habit.completed ? 'line-through decoration-zinc-600 text-zinc-500' : 'text-zinc-100'}`}>
            {habit.title}
          </p>
          <div className="flex items-center gap-2">
             <span className="text-[10px] text-zinc-500 font-mono uppercase">{habit.target}</span>
             {habit.streak > 0 && (
               <span className="flex items-center gap-0.5 text-[10px] text-amber-500/80 font-mono">
                 <Flame size={10} className="fill-amber-500/20" /> {habit.streak}d
               </span>
             )}
          </div>
        </div>
      </button>

      {/* Acciones: Ocultas por defecto, visibles al hacer hover en el contenedor "group" */}
      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={() => onEdit(habit)}
          className="text-zinc-500 hover:text-blue-400 hover:bg-zinc-800/50 p-1.5 rounded-md transition-colors"
          title="Editar hábito"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={() => onDelete(habit.id)}
          className="text-zinc-500 hover:text-red-400 hover:bg-zinc-800/50 p-1.5 rounded-md transition-colors"
          title="Eliminar hábito"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}