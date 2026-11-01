// src/lib/nutrition.ts

export interface UserProfile {
  weight: number; // kg
  height: number; // cm
  age: number;
  gender: 'male' | 'female';
  activityLevel: 1.2 | 1.375 | 1.55 | 1.725; // Sedentario, Ligero, Moderado, Activo
  goal: 'lose' | 'maintain' | 'gain'; // Perder grasa, Mantener, Ganar músculo
}

// Calcular Calorías Diarias Objetivo
export function calculateDailyCalories(profile: UserProfile) {
  // Fórmula Mifflin-St Jeor
  const bmr = profile.gender === 'male'
    ? (10 * profile.weight) + (6.25 * profile.height) - (5 * profile.age) + 5
    : (10 * profile.weight) + (6.25 * profile.height) - (5 * profile.age) - 161;

  let tdee = bmr * profile.activityLevel;

  // Ajuste según objetivo
  if (profile.goal === 'lose') tdee -= 500; // Déficit de 500 kcal
  if (profile.goal === 'gain') tdee += 300; // Superávit de 300 kcal

  return Math.round(tdee);
}

// Calcular Macros (Proteína, Carbos, Grasas)
export function calculateMacros(calories: number, weight: number) {
  // Proteína: 2g por kg de peso (ideal para cambiar composición corporal)
  const proteinGrams = Math.round(weight * 2);
  const proteinCalories = proteinGrams * 4;

  // Grasas: 25% de las calorías totales
  const fatCalories = calories * 0.25;
  const fatGrams = Math.round(fatCalories / 9);

  // Carbohidratos: El resto de las calorías
  const carbCalories = calories - proteinCalories - fatCalories;
  const carbGrams = Math.round(carbCalories / 4);

  return { protein: proteinGrams, carbs: carbGrams, fats: fatGrams };
}