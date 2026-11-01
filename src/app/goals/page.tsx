'use client';

import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { BottomNav } from '@/components/ui/BottomNav';
import { GoalCard } from '@/components/goals/GoalCard';
import { GoalModal } from '@/components/goals/GoalModal';
import { Goal } from '@/types';
import { Target, Plus } from 'lucide-react';

export default function GoalsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  // Consultar metas en tiempo real
  const goals = useLiveQuery(() => db.goals.toArray(), []) || [];

  const handleAddGoal = async (data: Omit<Goal, 'id'>) => {
    await db.goals.add(data);
  };

  const handleUpdateGoal = async (id: number, newValue: number) => {
    await db.goals.update(id, { currentValue: newValue });
  };

  const handleEditSave = async (data: Omit<Goal, 'id'>) => {
    if (editingGoal?.id) {
      await db.goals.update(editingGoal.id, data);
    }
  };

  const handleDeleteGoal = async (id: number) => {
    if (confirm('¿Seguro que quieres eliminar esta meta?')) {
      await db.goals.delete(id);
    }
  };

  const handleOpenCreate = () => {
    setEditingGoal(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (goal: Goal) => {
    setEditingGoal(goal);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-20 pt-6 px-4 antialiased relative md:pb-12">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <main className="max-w-md mx-auto space-y-5 relative z-10 md:max-w-5xl md:space-y-6">
        
        {/* HEADER */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-medium text-zinc-100">Metas Físicas</h1>
            <p className="text-xs text-zinc-500 font-mono">Objetivos y evolución</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenCreate}
              className="bg-zinc-100 hover:bg-zinc-200 text-zinc-950 p-2 rounded-xl transition-colors flex items-center gap-1 text-xs font-medium shadow-sm"
            >
              <Plus size={16} /> Nueva Meta
            </button>
          </div>
        </header>

        {/* LISTA DE METAS */}
        {goals.length === 0 ? (
          <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-10 flex flex-col items-center justify-center text-center space-y-3 mt-4">
            <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-600 mb-1">
              <Target size={24} />
            </div>
            <h2 className="text-sm font-medium text-zinc-300">Aún no tienes metas</h2>
            <p className="text-xs text-zinc-500 max-w-[250px]">Define tu primer objetivo físico para empezar a rastrear tu progreso diario.</p>
            <button
              onClick={handleOpenCreate}
              className="mt-2 text-emerald-400 text-xs font-medium hover:text-emerald-300 transition-colors"
            >
              + Crear mi primera meta
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {goals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onUpdateProgress={handleUpdateGoal}
                onEdit={handleOpenEdit}
                onDelete={handleDeleteGoal}
              />
            ))}
          </div>
        )}
      </main>

      {/* MODAL */}
      <GoalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={editingGoal ? handleEditSave : handleAddGoal}
        editingGoal={editingGoal}
      />

      <BottomNav />
    </div>
  );
}