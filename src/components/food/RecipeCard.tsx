'use client';

import React, { useState } from 'react';
import { Clock, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { Recipe, MealLog } from '@/types';

// 👇 AQUÍ ESTÁ LA MAGIA: Agregamos todayStr y onAddLog a la interfaz
interface RecipeCardProps {
  recipe: Recipe;
  todayStr: string;
  onAddLog: (log: Omit<MealLog, 'id'>) => void;
}

export function RecipeCard({ recipe, todayStr, onAddLog }: RecipeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleQuickAdd = () => {
    if (!todayStr) return;
    
    // Determinamos el tipo de comida basándonos en la categoría de la receta
    const mealType = ['Desayuno', 'Almuerzo', 'Merienda', 'Cena'].includes(recipe.category) 
      ? recipe.category 
      : 'Almuerzo'; 

    onAddLog({
      date: todayStr,
      mealType: mealType,
      description: recipe.title,
      digestion: 'Liviano', 
      energyPost: 4,        
      calories: recipe.calories || 0,
      protein: recipe.protein || 0,
      carbs: recipe.carbs || 0,
      fats: recipe.fats || 0,
    });
    
    alert(`¡${recipe.title} registrado en tu día!`);
  };

  return (
    <div className={`bg-zinc-900/60 border rounded-xl overflow-hidden transition-all duration-300 ${
      isExpanded ? 'border-zinc-600 shadow-md' : 'border-zinc-800/80'
    }`}>
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-zinc-800/30 transition-colors"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-400 uppercase">
              {recipe.category}
            </span>
            <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
              <Clock size={10} /> {recipe.prepTime}
            </span>
          </div>
          <h3 className="text-xs font-medium text-zinc-100">{recipe.title}</h3>
        </div>
        <div className={`transition-transform duration-300 ${isExpanded ? 'text-zinc-300' : 'text-zinc-500'}`}>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      {isExpanded && (
        <div className="px-3.5 pb-3.5 pt-2 border-t border-zinc-800/50 space-y-3 bg-zinc-950/40">
          
          {/* Macros */}
          {recipe.calories && (
            <div className="flex gap-2 flex-wrap pb-2">
              <span className="text-[9px] bg-zinc-900 border border-zinc-800 px-2 py-1 rounded text-zinc-300">🔥 {recipe.calories} kcal</span>
              <span className="text-[9px] bg-red-500/10 border border-red-500/20 text-red-400 px-2 py-1 rounded">🥩 {recipe.protein}g Prot</span>
              <span className="text-[9px] bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-1 rounded">🌾 {recipe.carbs}g Carb</span>
              <span className="text-[9px] bg-blue-500/10 border border-blue-500/20 text-blue-400 px-2 py-1 rounded">💧 {recipe.fats}g Gras</span>
            </div>
          )}

          <div>
            <span className="text-[10px] text-zinc-500 font-mono block mb-1">Ingredientes:</span>
            <ul className="text-xs text-zinc-300 space-y-1">
              {recipe.ingredients.map((ing, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-zinc-500 rounded-full" />
                  <span>{ing}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <span className="text-[10px] text-zinc-500 font-mono block mb-1">Pasos:</span>
            <ol className="text-xs text-zinc-400 space-y-1 list-decimal list-inside">
              {recipe.steps.map((step, idx) => (
                <li key={idx} className="text-zinc-300">{step}</li>
              ))}
            </ol>
          </div>

          {/* Botón Registrar */}
          <div className="pt-2 flex items-center justify-between border-t border-zinc-800/50">
            <span className="text-[10px] font-mono text-emerald-400/80 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
              {recipe.energyImpact}
            </span>
            
            <button
              onClick={handleQuickAdd}
              className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-medium px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1"
            >
              <Plus size={14} /> Registrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}