'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Habit } from '@/types';

interface HabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { title: string; target: string }) => void;
  editingHabit: Habit | null;
}

export function HabitModal({ isOpen, onClose, onSave, editingHabit }: HabitModalProps) {
  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('');

  // Si estamos editando, precargamos los datos
  useEffect(() => {
    if (editingHabit) {
      setTitle(editingHabit.title);
      setTarget(editingHabit.target);
    } else {
      setTitle('');
      setTarget('');
    }
  }, [editingHabit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ title: title.trim(), target: target.trim() || 'Sin meta' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-zinc-100">
            {editingHabit ? 'Editar Hábito' : 'Nuevo Hábito'}
          </h3>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">Nombre</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Leer un libro"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-zinc-600"
              autoFocus
            />
          </div>
          
          <div>
            <label className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">Meta / Duración</label>
            <input
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="Ej: 30m, 1h, 10 pág..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-zinc-600"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-zinc-100 hover:bg-zinc-200 text-zinc-950 px-4 py-2 rounded-lg text-xs font-medium transition-colors"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}