'use client';

import React, { useState } from 'react';
import { Plus, Zap } from 'lucide-react';
import { MealLog, EnergyLevel } from '@/types';

type MealType = 'Desayuno' | 'Almuerzo' | 'Merienda' | 'Cena';
type DigestionType = 'Liviano' | 'Pesado';

interface MealLogFormProps {
  onAddLog: (log: Omit<MealLog, 'id'>) => void;
  todayStr: string;
}

export function MealLogForm({ onAddLog, todayStr }: MealLogFormProps) {
  const [mealType, setMealType] = useState<MealType>('Desayuno');
  const [description, setDescription] = useState('');
  const [digestion, setDigestion] = useState<DigestionType>('Liviano');
  const [energyPost, setEnergyPost] = useState<EnergyLevel>(4);
  
  // Nuevos estados para macros
  const [calories, setCalories] = useState<number | ''>('');
  const [protein, setProtein] = useState<number | ''>('');
  const [carbs, setCarbs] = useState<number | ''>('');
  const [fats, setFats] = useState<number | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !todayStr) return;

    onAddLog({
      date: todayStr,
      mealType,
      description: description.trim(),
      digestion,
      energyPost,
      calories: calories === '' ? 0 : Number(calories),
      protein: protein === '' ? 0 : Number(protein),
      carbs: carbs === '' ? 0 : Number(carbs),
      fats: fats === '' ? 0 : Number(fats),
    });
    
    // Limpiar formulario
    setDescription('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFats('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4 space-y-3.5 shadow-lg">
      <span className="text-xs font-medium tracking-wider text-zinc-400 uppercase block">
        Registrar Comida
      </span>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[10px] text-zinc-500 font-mono block mb-1">Momento</label>
          <select
            value={mealType}
            onChange={(e) => setMealType(e.target.value as MealType)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-zinc-600"
          >
            <option value="Desayuno">Desayuno</option>
            <option value="Almuerzo">Almuerzo</option>
            <option value="Merienda">Merienda</option>
            <option value="Cena">Cena</option>
          </select>
        </div>
        <div>
          <label className="text-[10px] text-zinc-500 font-mono block mb-1">Digestión</label>
          <select
            value={digestion}
            onChange={(e) => setDigestion(e.target.value as DigestionType)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-zinc-600"
          >
            <option value="Liviano">😊 Liviano</option>
            <option value="Pesado">🥱 Pesado</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-[10px] text-zinc-500 font-mono block mb-1">¿Qué comiste?</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ej: Bowl de pollo..."
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
        />
      </div>

      {/* SECCIÓN DE MACROS (Opcional) */}
      <div className="bg-zinc-950/50 p-2.5 rounded-lg border border-zinc-800/50 space-y-2">
        <span className="text-[10px] text-zinc-500 font-mono uppercase block">Macros (Opcional)</span>
        <div className="grid grid-cols-4 gap-2">
          <div>
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="Kcal"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-2 py-1 text-[10px] text-zinc-200 focus:outline-none text-center"
            />
          </div>
          <div>
            <input
              type="number"
              value={protein}
              onChange={(e) => setProtein(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="Prot (g)"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-2 py-1 text-[10px] text-zinc-200 focus:outline-none text-center"
            />
          </div>
          <div>
            <input
              type="number"
              value={carbs}
              onChange={(e) => setCarbs(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="Carb (g)"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-2 py-1 text-[10px] text-zinc-200 focus:outline-none text-center"
            />
          </div>
          <div>
            <input
              type="number"
              value={fats}
              onChange={(e) => setFats(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="Gras (g)"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-2 py-1 text-[10px] text-zinc-200 focus:outline-none text-center"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-zinc-500 font-mono">Energía post:</span>
          <div className="flex gap-1.5 bg-zinc-950 px-2.5 py-1.5 rounded-lg border border-zinc-800">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setEnergyPost(level as EnergyLevel)}
                className={`transition-all duration-200 hover:scale-110 active:scale-90 ${
                  level <= energyPost ? 'text-amber-400' : 'text-zinc-700 hover:text-zinc-500'
                }`}
              >
                <Zap size={15} className={level <= energyPost ? 'fill-amber-400/20' : ''} />
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-medium px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1"
        >
          <Plus size={14} /> Guardar
        </button>
      </div>
    </form>
  );
}