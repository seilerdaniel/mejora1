'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Habit } from '@/types';
import { HabitItem } from './HabitItem';
import { HabitModal } from './HabitModal';

interface HabitTrackerProps {
  habits: Habit[];
  onToggleHabit: (id: string) => void;
  onAddHabit: (data: { title: string; target: string }) => void;
  onUpdateHabit: (id: string, data: { title: string; target: string }) => void;
  onDeleteHabit: (id: string) => void;
}

export function HabitTracker({ 
  habits, 
  onToggleHabit, 
  onAddHabit, 
  onUpdateHabit, 
  onDeleteHabit 
}: HabitTrackerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

  const completedCount = habits.filter((h) => h.completed).length;
  const progressPercentage = habits.length > 0 
    ? Math.round((completedCount / habits.length) * 100) 
    : 0;

  const handleOpenCreate = () => {
    setEditingHabit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (habit: Habit) => {
    setEditingHabit(habit);
    setIsModalOpen(true);
  };

  const handleSave = (data: { title: string; target: string }) => {
    if (editingHabit) {
      onUpdateHabit(editingHabit.id, data);
    } else {
      onAddHabit(data);
    }
  };

  return (
    <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-5 shadow-lg flex flex-col justify-between">
      <div>
        {/* CABECERA MEJORADA (UX/UI) */}
        <div className="flex items-center justify-between mb-4 mt-1">
          <div className="flex flex-col">
            <span className="text-xs font-medium tracking-wider text-zinc-400 uppercase">
              Hábitos Diarios
            </span>
            <span className="text-[10px] text-zinc-500 font-mono mt-0.5">
              {completedCount} de {habits.length} completados ({progressPercentage}%)
            </span>
          </div>
          
          <button 
            onClick={handleOpenCreate}
            className="flex items-center justify-center bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 w-7 h-7 rounded-lg border border-zinc-700/50 transition-colors"
            title="Agregar Hábito"
          >
            <Plus size={14} strokeWidth={2.5} />
          </button>
        </div>

        {/* Barra de progreso */}
        <div className="w-full bg-zinc-950 h-1.5 rounded-full overflow-hidden mb-4 border border-zinc-800/50">
          <div
            className="bg-zinc-100 h-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Lista de Hábitos */}
        <div className="space-y-2.5">
          {habits.map((habit) => (
            <HabitItem 
              key={habit.id} 
              habit={habit} 
              onToggle={onToggleHabit}
              onEdit={handleOpenEdit}
              onDelete={onDeleteHabit}
            />
          ))}
          {habits.length === 0 && (
            <p className="text-xs text-zinc-600 text-center py-4">
              No hay hábitos configurados.
            </p>
          )}
        </div>
      </div>

      {/* Modal de Creación/Edición */}
      <HabitModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        editingHabit={editingHabit}
      />
    </div>
  );
}