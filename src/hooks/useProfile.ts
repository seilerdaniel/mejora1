import { useState, useEffect } from 'react';
import { UserProfile, calculateDailyCalories, calculateMacros } from '@/lib/nutrition';

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);


  const STORAGE_KEY = 'mejora_profile';

  // Cargar datos al montar
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch (e) {
        console.error("Error al cargar el perfil", e);
      }
    }
    setIsLoaded(true);
  }, [STORAGE_KEY]);

  // Guardar datos
  const saveProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
  };

  // Calcular metas (si existe el perfil)
  let targets = null;
  if (profile) {
    const calories = calculateDailyCalories(profile);
    const macros = calculateMacros(calories, profile.weight);
    targets = { calories, ...macros };
  }

  return { profile, saveProfile, targets, isLoaded };
}