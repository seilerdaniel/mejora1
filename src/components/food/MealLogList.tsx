'use client';

import React from 'react';
import { Zap, Utensils, Trash2 } from 'lucide-react'; // <-- Agregamos Trash2
import { MealLog } from '@/types';

interface MealLogListProps {
  logs: MealLog[];
  onDelete: (id: number) => void; // <-- Nueva prop
}

export function MealLogList({ logs, onDelete }: MealLogListProps) {
  return (
    <div className="space-y-3">
      <span className="text-xs font-medium tracking-wider text-zinc-400 uppercase block">
        Comidas Registradas Hoy
      </span>

      {logs.length === 0 ? (
        <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-2">
          <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-600 mb-1">
            <Utensils size={18} />
          </div>
          <p className="text-xs text-zinc-500 font-mono">Aún no has registrado comidas hoy.</p>
          <p className="text-[10px] text-zinc-600">Usa el formulario de arriba para empezar.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {logs.map((log) => (
            <div key={log.id} className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3 flex items-center justify-between shadow-sm transition-all hover:border-zinc-700 group">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-400">
                    {log.mealType}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    {log.digestion === 'Liviano' ? '😊 Liviano' : '🥱 Pesado'}
                  </span>
                </div>
                <p className="text-xs text-zinc-200 font-medium">{log.description}</p>
              </div>
              
              {/* Contenedor derecho: Energía + Botón de borrar */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-xs font-mono text-amber-400 bg-zinc-950 px-2 py-1 rounded-lg border border-zinc-800">
                  <Zap size={12} className="fill-amber-400/20" />
                  <span>{log.energyPost}/5</span>
                </div>
                
                <button
                  onClick={() => log.id && onDelete(log.id)}
                  className="text-zinc-600 hover:text-red-400 hover:bg-zinc-800/50 p-1.5 rounded-md transition-colors"
                  title="Eliminar registro"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}