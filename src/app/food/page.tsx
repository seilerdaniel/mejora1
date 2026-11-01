'use client';

import React, { useState, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { BottomNav } from '@/components/ui/BottomNav';
import { MealLog } from '@/types';
import { Utensils, Search } from 'lucide-react';

import { MealLogForm } from '@/components/food/MealLogForm';
import { MealLogList } from '@/components/food/MealLogList';
import { RecipeCard } from '@/components/food/RecipeCard';

export default function FoodPage() {
  const [activeTab, setActiveTab] = useState<'log' | 'recipes'>('log');
  const [todayStr, setTodayStr] = useState<string>('');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  useEffect(() => {
    setTodayStr(new Date().toISOString().split('T')[0]);
  }, []);

  const todayLogs = useLiveQuery(
    () => (todayStr ? db.mealLogs.where('date').equals(todayStr).toArray() : []),
    [todayStr]
  ) || [];

  const recipes = useLiveQuery(() => db.recipes.toArray(), []) || [];

  const handleAddMealLog = async (newLog: Omit<MealLog, 'id'>) => {
    await db.mealLogs.add(newLog);
  };

  const handleDeleteMealLog = async (id: number) => {
    if (confirm('¿Eliminar este registro de comida?')) {
      await db.mealLogs.delete(id);
    }
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory = selectedCategory === 'Todas' || recipe.category === selectedCategory;
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-20 pt-6 px-4 antialiased relative md:pb-12">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <main className="max-w-md mx-auto space-y-5 relative z-10 md:max-w-6xl md:space-y-6">
        
        <header className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-base font-medium text-zinc-100">Alimentación & Energía</h1>
              <p className="text-xs text-zinc-500 font-mono">Registro diario y recetas express</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-2 rounded-xl text-zinc-400">
              <Utensils size={18} />
            </div>
          </div>

          <div className="flex bg-zinc-900/80 p-1 rounded-xl border border-zinc-800/80 md:max-w-md">
            <button
              onClick={() => setActiveTab('log')}
              className={`flex-1 py-1.5 text-xs font-mono rounded-lg transition-colors ${
                activeTab === 'log' ? 'bg-zinc-100 text-zinc-950 font-medium' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Registro de Hoy
            </button>
            <button
              onClick={() => setActiveTab('recipes')}
              className={`flex-1 py-1.5 text-xs font-mono rounded-lg transition-colors ${
                activeTab === 'recipes' ? 'bg-zinc-100 text-zinc-950 font-medium' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Recetario ({recipes.length})
            </button>
          </div>
        </header>

        {activeTab === 'log' && (
          <div className="animate-in fade-in duration-300 md:grid md:grid-cols-12 md:gap-6 md:items-start">
            <div className="md:col-span-5 lg:col-span-4 mb-5 md:mb-0">
              <MealLogForm onAddLog={handleAddMealLog} todayStr={todayStr} />
            </div>
            <div className="md:col-span-7 lg:col-span-8">
              <MealLogList logs={todayLogs} onDelete={handleDeleteMealLog} />
            </div>
          </div>
        )}

        {activeTab === 'recipes' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="md:flex md:gap-4 md:items-center">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-3 text-zinc-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar receta o ingrediente..."
                  className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
                />
              </div>

              <div className="flex gap-1.5 overflow-x-auto pb-1 mt-3 md:mt-0 no-scrollbar">
                {['Todas', 'Desayuno', 'Almuerzo', 'Merienda', 'Cena'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono whitespace-nowrap border transition-colors ${
                      selectedCategory === cat
                        ? 'bg-zinc-100 text-zinc-950 border-zinc-100 font-medium'
                        : 'bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 items-start">
              {filteredRecipes.length === 0 ? (
                <div className="col-span-full bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-6 text-center">
                  <p className="text-xs text-zinc-600 font-mono">No se encontraron recetas.</p>
                </div>
              ) : (
                filteredRecipes.map((recipe) => (
                  <RecipeCard 
                    key={recipe.id} 
                    recipe={recipe} 
                    todayStr={todayStr}
                    onAddLog={handleAddMealLog}
                  />
                ))
              )}
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}