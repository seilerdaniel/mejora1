import { useState, useEffect } from 'react';
import { UserProfile, calculateDailyCalories, calculateMacros } from '@/lib/nutrition';

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar datos al montar
  useEffect(() => {
    const saved = localStorage.getItem('kurufit_profile');
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch (e) {
        console.error("Error al cargar el perfil", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Guardar datos
  const saveProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    localStorage.setItem('kurufit_profile', JSON.stringify(newProfile));
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