'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Goal } from '@/types';

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Goal, 'id'>) => void;
  editingGoal: Goal | null;
}

export function GoalModal({ isOpen, onClose, onSave, editingGoal }: GoalModalProps) {
  const [title, setTitle] = useState('');
  const [currentValue, setCurrentValue] = useState<number | ''>('');
  const [targetValue, setTargetValue] = useState<number | ''>('');
  const [unit, setUnit] = useState('');

  useEffect(() => {
    if (editingGoal) {
      setTitle(editingGoal.title);
      setCurrentValue(editingGoal.currentValue);
      setTargetValue(editingGoal.targetValue);
      setUnit(editingGoal.unit);
    } else {
      setTitle('');
      setCurrentValue('');
      setTargetValue('');
      setUnit('');
    }
  }, [editingGoal, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || currentValue === '' || targetValue === '' || !unit.trim()) return;

    onSave({
      title: title.trim(),
      currentValue: Number(currentValue),
      targetValue: Number(targetValue),
      unit: unit.trim(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-zinc-100">
            {editingGoal ? 'Editar Meta' : 'Nueva Meta Física'}
          </h3>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">Objetivo</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Bajar de peso, Hacer flexiones..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-zinc-600"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">Valor Actual</label>
              <input
                type="number"
                value={currentValue}
                onChange={(e) => setCurrentValue(Number(e.target.value))}
                placeholder="Ej: 80"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-zinc-600"
              />
            </div>
            <div>
              <label className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">Valor Meta</label>
              <input
                type="number"
                value={targetValue}
                onChange={(e) => setTargetValue(Number(e.target.value))}
                placeholder="Ej: 75"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-zinc-600"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">Unidad (kg, reps, días, etc.)</label>
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="Ej: kg"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-zinc-600"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-xs text-zinc-400 hover:text-zinc-200">Cancelar</button>
            <button type="submit" className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-medium px-4 py-2 rounded-lg text-xs transition-colors">Guardar Meta</button>
          </div>
        </form>
      </div>
    </div>
  );
}