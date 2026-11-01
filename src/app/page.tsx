'use client';

import React, { useState, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { PomodoroTimer } from '@/components/dashboard/PomodoroTimer';
import { HabitTracker } from '@/components/dashboard/HabitTracker';
import { TodoList } from '@/components/dashboard/TodoList';
import { BottomNav } from '@/components/ui/BottomNav';
import { EnergyLevel, TodoItem } from '@/types';
import { Zap } from 'lucide-react';

import { useProfile } from '@/hooks/useProfile';
import { ProfileModal } from '@/components/profile/ProfileModal';
import { NutritionSummary } from '@/components/dashboard/NutritionSummary';

type Category = 'Proyecto' | 'Hogar' | 'Compras';

export default function Dashboard() {
  const [energyLevel, setEnergyLevel] = useState<EnergyLevel>(4);
  const [currentDate, setCurrentDate] = useState<string>('');
  const [greeting, setGreeting] = useState<string>('Hola');
  const [todayStr, setTodayStr] = useState<string>(''); //
  
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { profile, saveProfile, targets } = useProfile();

  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleDateString('es-AR', {
      weekday: 'long', day: 'numeric', month: 'short'
    });
    setCurrentDate(formatted);

    setTodayStr(now.toISOString().split('T')[0]);

    const hour = now.getHours();
    if (hour < 12) setGreeting('Buenos días');
    else if (hour < 20) setGreeting('Buenas tardes');
    else setGreeting('Buenas noches');
  }, []);

  const habits = useLiveQuery(() => db.habits.toArray(), []) || [];
  const todos = useLiveQuery(() => db.todos.toArray(), []) || [];
  
  const todayMealLogs = useLiveQuery(
    () => (todayStr ? db.mealLogs.where('date').equals(todayStr).toArray() : []),
    [todayStr]
  ) || [];

  // Sumar los macros
  const consumedMacros = todayMealLogs.reduce((acc, log) => ({
    calories: acc.calories + (log.calories || 0),
    protein: acc.protein + (log.protein || 0),
    carbs: acc.carbs + (log.carbs || 0),
    fats: acc.fats + (log.fats || 0),
  }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

  // --- LÓGICA DE HÁBITOS ---
  const handleToggleHabit = async (id: string) => {
    const habit = habits.find((h) => h.id === id);
    if (habit) {
      const newCompleted = !habit.completed;
      await db.habits.update(id, {
        completed: newCompleted,
        streak: newCompleted ? habit.streak + 1 : Math.max(0, habit.streak - 1)
      });
    }
  };

  const handleAddHabit = async (data: { title: string; target: string }) => {
    await db.habits.add({
      id: crypto.randomUUID(),
      title: data.title,
      target: data.target,
      completed: false,
      streak: 0
    });
  };

  const handleUpdateHabit = async (id: string, data: { title: string; target: string }) => {
    await db.habits.update(id, data);
  };

  const handleDeleteHabit = async (id: string) => {
    if (confirm('¿Eliminar este hábito?')) {
      await db.habits.delete(id);
    }
  };

  const handlePomodoroComplete = async () => {
    const projectHabit = habits.find((h) => h.title === 'Proyecto Personal');
    if (projectHabit && !projectHabit.completed) {
      await db.habits.update(projectHabit.id, {
        completed: true,
        streak: projectHabit.streak + 1
      });
    }
  };

  // --- LÓGICA DE TAREAS ---
  const handleAddTodo = async (text: string, category: Category) => {
    const newTodo: TodoItem = {
      id: crypto.randomUUID(),
      text,
      category,
      completed: false
    };
    await db.todos.add(newTodo);
  };

  const handleUpdateTodo = async (id: string, text: string, category: Category) => {
    await db.todos.update(id, { text, category });
  };

  const handleToggleTodo = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      await db.todos.update(id, { completed: !todo.completed });
    }
  };

  const handleDeleteTodo = async (id: string) => {
    await db.todos.delete(id);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-20 pt-6 px-4 antialiased relative md:pb-12">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <main className="max-w-md mx-auto space-y-5 relative z-10 md:max-w-6xl md:space-y-6">

        {/* HEADER */}
        <header className="flex items-center justify-between bg-zinc-900/60 backdrop-blur-md border border-zinc-800/80 p-4 rounded-xl shadow-lg">
          <div>
            <h1 className="text-base font-medium text-zinc-100">
              {greeting}, Daniel
            </h1>
            <p className="text-xs text-zinc-500 font-mono capitalize h-4 mt-0.5">
              {currentDate || 'Cargando...'}
            </p>
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <span className="text-[10px] text-zinc-500 uppercase font-mono tracking-wider">
              Energía Hoy
            </span>
            <div className="flex items-center gap-1.5 bg-zinc-950 px-2.5 py-1.5 rounded-lg border border-zinc-800/80">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  onClick={() => setEnergyLevel(level as EnergyLevel)}
                  className={`transition-all duration-200 hover:scale-110 active:scale-95 ${
                    level <= energyLevel ? 'text-amber-400' : 'text-zinc-700 hover:text-zinc-500'
                  }`}
                  title={`Nivel de energía: ${level}`}
                >
                  <Zap size={14} className={level <= energyLevel ? 'fill-amber-400/20' : ''} />
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* GRID RESPONSIVE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          
          <div className="lg:col-span-1 h-full">
            <NutritionSummary 
              targets={targets} 
              consumed={consumedMacros}
              onOpenProfile={() => setIsProfileModalOpen(true)} 
            />
          </div>

          <div className="lg:col-span-1 h-full">
            <PomodoroTimer onCompleteSession={handlePomodoroComplete} />
          </div>

          <div className="lg:col-span-1 h-full">
            <HabitTracker
              habits={habits}
              onToggleHabit={handleToggleHabit}
              onAddHabit={handleAddHabit}
              onUpdateHabit={handleUpdateHabit}
              onDeleteHabit={handleDeleteHabit}
            />
          </div>

          <div className="md:col-span-2 lg:col-span-1 h-full">
            <TodoList
              todos={todos}
              onAddTodo={handleAddTodo}
              onUpdateTodo={handleUpdateTodo}
              onToggleTodo={handleToggleTodo}
              onDeleteTodo={handleDeleteTodo}
            />
          </div>
        </div>

      </main>

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onSave={saveProfile}
        currentProfile={profile}
      />

      <BottomNav />
    </div>
  );
}