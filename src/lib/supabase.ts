
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types based on our schema
export type Profile = {
  id: string;
  created_at: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
};

export type Workout = {
  id: string;
  created_at: string;
  user_id: string;
  name: string;
  date: string;
  notes: string | null;
  duration: number;
  calories_burned: number | null;
};

export type Exercise = {
  id: string;
  created_at: string;
  workout_id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number | null;
  duration: number | null;
  notes: string | null;
};

export type Measurement = {
  id: string;
  created_at: string;
  user_id: string;
  date: string;
  weight: number | null;
  body_fat: number | null;
  chest: number | null;
  waist: number | null;
  hips: number | null;
  arms: number | null;
  thighs: number | null;
  notes: string | null;
};

export type Goal = {
  id: string;
  created_at: string;
  user_id: string;
  title: string;
  description: string | null;
  target_date: string | null;
  achieved: boolean;
  category: 'weight' | 'strength' | 'cardio' | 'other';
  target_value: number | null;
  current_value: number | null;
  unit: string | null;
};
