'use client';

import React, { useState, useEffect } from 'react';
import { X, User, Scale, Ruler, Flame } from 'lucide-react';
import { UserProfile } from '@/lib/nutrition';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profile: UserProfile) => void;
  currentProfile: UserProfile | null;
}

export function ProfileModal({ isOpen, onClose, onSave, currentProfile }: ProfileModalProps) {
  const [weight, setWeight] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activityLevel, setActivityLevel] = useState<UserProfile['activityLevel']>(1.375);
  const [goal, setGoal] = useState<UserProfile['goal']>('maintain');

  useEffect(() => {
    if (currentProfile) {
      setWeight(currentProfile.weight);
      setHeight(currentProfile.height);
      setAge(currentProfile.age);
      setGender(currentProfile.gender);
      setActivityLevel(currentProfile.activityLevel);
      setGoal(currentProfile.goal);
    }
  }, [currentProfile, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight || !height || !age) return;

    onSave({
      weight: Number(weight),
      height: Number(height),
      age: Number(age),
      gender,
      activityLevel,
      goal,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 w-full max-w-sm shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-zinc-100 flex items-center gap-2">
            <User size={16} className="text-emerald-400" /> Tu Perfil
          </h3>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">Peso (kg)</label>
              <div className="relative">
                <Scale size={14} className="absolute left-2.5 top-2.5 text-zinc-500" />
                <input
                  type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))}
                  placeholder="75" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-8 pr-2 py-2 text-xs text-zinc-100 focus:outline-none focus:border-zinc-600"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">Altura (cm)</label>
              <div className="relative">
                <Ruler size={14} className="absolute left-2.5 top-2.5 text-zinc-500" />
                <input
                  type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))}
                  placeholder="178" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-8 pr-2 py-2 text-xs text-zinc-100 focus:outline-none focus:border-zinc-600"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">Edad</label>
              <input
                type="number" value={age} onChange={(e) => setAge(Number(e.target.value))}
                placeholder="30" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-zinc-600"
              />
            </div>
            <div>
              <label className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">Género</label>
              <select
                value={gender} onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-zinc-600"
              >
                <option value="male">Hombre</option>
                <option value="female">Mujer</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">Nivel de Actividad</label>
            <select
              value={activityLevel} onChange={(e) => setActivityLevel(Number(e.target.value) as UserProfile['activityLevel'])}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-zinc-600"
            >
              <option value={1.2}>Sedentario (Poco o nada de ejercicio)</option>
              <option value={1.375}>Ligero (1-3 días a la semana)</option>
              <option value={1.55}>Moderado (3-5 días a la semana)</option>
              <option value={1.725}>Activo (6-7 días a la semana)</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">Objetivo Físico</label>
            <select
              value={goal} onChange={(e) => setGoal(e.target.value as UserProfile['goal'])}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-zinc-600"
            >
              <option value="lose">Perder grasa (Déficit -500 kcal)</option>
              <option value="maintain">Mantener peso (Calorías de mantenimiento)</option>
              <option value="gain">Ganar músculo (Superávit +300 kcal)</option>
            </select>
          </div>

          <div className="pt-2 flex justify-end gap-2 border-t border-zinc-800/50 mt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-xs text-zinc-400 hover:text-zinc-200 mt-2">Cancelar</button>
            <button type="submit" className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-medium px-4 py-2 rounded-lg text-xs transition-colors mt-2">Calcular Macros</button>
          </div>
        </form>
      </div>
    </div>
  );
}