'use client';

import React, { useState, useEffect } from 'react';
import { BottomNav } from '@/components/ui/BottomNav';
import { Calendar, Sparkles, ChefHat } from 'lucide-react';

import { DayPlanCard, DayPlan } from '@/components/planner/DayPlanCard';
import { BatchCookingItem, PrepItem } from '@/components/planner/BatchCookingItem';

export default function PlannerPage() {
  const [activeTab, setActiveTab] = useState<'weekly' | 'batch'>('weekly');
  const [mounted, setMounted] = useState(false);

  const [weeklyPlan, setWeeklyPlan] = useState<DayPlan[]>([
    { day: 'Lunes', lunch: 'Bowl de Quinoa, Pollo y Calabaza', dinner: 'Omelette de Espinaca y Queso' },
    { day: 'Martes', lunch: 'Ensalada Proteica de Garbanzos y Atún', dinner: 'Zapallo Anco Relleno de Atún' },
    { day: 'Miércoles', lunch: 'Salteado de Lentejas y Vegetales', dinner: 'Wok Exprés de Pollo y Vegetales' },
    { day: 'Jueves', lunch: 'Bowl de Quinoa, Pollo y Calabaza', dinner: 'Omelette de Espinaca y Queso' },
    { day: 'Viernes', lunch: 'Ensalada Proteica de Garbanzos y Atún', dinner: 'Zapallo Anco Relleno de Atún' },
    { day: 'Sábado', lunch: 'Salteado de Lentejas y Vegetales', dinner: 'Cena Libre / Social' },
    { day: 'Domingo', lunch: 'Almuerzo Familiar', dinner: 'Preparación de Menú Semanal' }
  ]);

  const [prepItems, setPrepItems] = useState<PrepItem[]>([
    { id: '1', title: 'Hervir Quinoa / Arroz Integral', quantity: '2 tazas en seco', completed: false },
    { id: '2', title: 'Hornear Calabaza / Zapallo Anco', quantity: '2 unidades medianas', completed: false },
    { id: '3', title: 'Cocinar Pechugas de Pollo y desmenuzar', quantity: '1 kg', completed: false },
    { id: '4', title: 'Hervir Huevos para la semana', quantity: '6 a 8 unidades', completed: false },
    { id: '5', title: 'Lavar y secar Hojas Verdes (Espinaca/Lechuga)', quantity: '2 atados', completed: false },
    { id: '6', title: 'Porcionar Frutos Secos y Avena para meriendas', quantity: '5 frascos/tuppers', completed: false }
  ]);

  useEffect(() => {
    setMounted(true);
    const savedPlan = localStorage.getItem('sproutmind_weekly_plan');
    if (savedPlan) setWeeklyPlan(JSON.parse(savedPlan));

    const savedPrep = localStorage.getItem('sproutmind_batch_prep');
    if (savedPrep) setPrepItems(JSON.parse(savedPrep));
  }, []);

  const handleUpdatePlan = (dayIndex: number, field: 'lunch' | 'dinner', value: string) => {
    const updated = [...weeklyPlan];
    updated[dayIndex][field] = value;
    setWeeklyPlan(updated);
    localStorage.setItem('sproutmind_weekly_plan', JSON.stringify(updated));
  };

  const handleTogglePrep = (id: string) => {
    const updated = prepItems.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setPrepItems(updated);
    localStorage.setItem('sproutmind_batch_prep', JSON.stringify(updated));
  };

  const completedPrepCount = prepItems.filter((i) => i.completed).length;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-20 pt-6 px-4 antialiased relative md:pb-12">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <main className="max-w-md mx-auto space-y-5 relative z-10 md:max-w-6xl md:space-y-6">
        
        {/* HEADER Y TABS */}
        <header className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-base font-medium text-zinc-100">Planificación Semanal</h1>
              <p className="text-xs text-zinc-500 font-mono">Menú organizado y Batch Cooking</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-2 rounded-xl text-zinc-400 shadow-sm">
              <Calendar size={18} />
            </div>
          </div>

          <div className="flex bg-zinc-900/80 p-1 rounded-xl border border-zinc-800/80 md:max-w-md">
            <button
              onClick={() => setActiveTab('weekly')}
              className={`flex-1 py-1.5 text-xs font-mono rounded-lg transition-colors ${
                activeTab === 'weekly' ? 'bg-zinc-100 text-zinc-950 font-medium' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Menú Semanal
            </button>
            <button
              onClick={() => setActiveTab('batch')}
              className={`flex-1 py-1.5 text-xs font-mono rounded-lg transition-colors ${
                activeTab === 'batch' ? 'bg-zinc-100 text-zinc-950 font-medium' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Batch Cooking ({completedPrepCount}/{prepItems.length})
            </button>
          </div>
        </header>

        {/* PESTAÑA 1: MENÚ SEMANAL */}
        {activeTab === 'weekly' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-3 flex items-start gap-2.5 text-zinc-400 text-xs md:max-w-2xl">
              <Sparkles size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed">Un menú planificado evita improvisar decisiones cuando vuelves cansado a las 17:00.</span>
            </div>

            {/* GRID DE DÍAS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {weeklyPlan.map((item, idx) => (
                <DayPlanCard 
                  key={item.day} 
                  item={item} 
                  idx={idx} 
                  mounted={mounted} 
                  onUpdate={handleUpdatePlan} 
                />
              ))}
            </div>
          </div>
        )}

        {/* PESTAÑA 2: BATCH COOKING */}
        {activeTab === 'batch' && (
          <div className="space-y-4 animate-in fade-in duration-300 md:max-w-3xl md:mx-auto">
            <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2">
                <ChefHat size={18} className="text-zinc-200" />
                <h3 className="text-xs font-medium text-zinc-100">Sesión del Fin de Semana</h3>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Dedica 1.5 horas los sábados o domingos para dejar las bases cocidas. Durante la semana laboral solo tendrás que ensamblar tus comidas en 3 minutos.
              </p>
            </div>

            <div className="space-y-2">
              {prepItems.map((item) => (
                <BatchCookingItem 
                  key={item.id} 
                  item={item} 
                  onToggle={handleTogglePrep} 
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}