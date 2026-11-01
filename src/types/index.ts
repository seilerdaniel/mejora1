export type EnergyLevel = 1 | 2 | 3 | 4 | 5;

export interface Habit {
  id: string;
  title: string;
  target: string;
  completed: boolean;
  streak: number;
}

export interface TodoItem {
  id: string;
  text: string;
  category: 'Proyecto' | 'Hogar' | 'Compras';
  completed: boolean;
}
export interface Recipe {
  id: string;
  title: string;
  category: string;
  prepTime: string;
  energyImpact: string;
  ingredients: string[];
  steps: string[];
  calories?: number;
  protein?: number;
  carbs?: number;
  fats?: number;
}

export interface Goal {
  id?: number;
  title: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline?: string;
}

export interface MealLog {
  id?: number;
  date: string;
  mealType: string;
  description: string;
  digestion: 'Liviano' | 'Pesado';
  energyPost: number;
  calories?: number;
  protein?: number;
  carbs?: number;
  fats?: number;
}