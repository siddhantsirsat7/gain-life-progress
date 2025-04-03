
import { format, subDays } from "date-fns";

// Types
export interface Workout {
  id: string;
  date: string;
  type: string;
  duration: number;
  caloriesBurned: number;
  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

export interface Measurement {
  id: string;
  date: string;
  weight: number;
  bodyFat?: number;
  chestSize?: number;
  waistSize?: number;
  armSize?: number;
  legSize?: number;
}

export interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  category: 'strength' | 'cardio' | 'weight' | 'habit';
}

// Sample Data Generator
export const generateSampleData = () => {
  const today = new Date();
  
  // Generate workout data for the last 30 days
  const workouts: Workout[] = [];
  for (let i = 0; i < 14; i++) {
    const workoutDate = subDays(today, i * 2);
    
    workouts.push({
      id: `workout-${i}`,
      date: format(workoutDate, "yyyy-MM-dd"),
      type: i % 2 === 0 ? "Strength" : "Cardio",
      duration: 30 + Math.floor(Math.random() * 30),
      caloriesBurned: 200 + Math.floor(Math.random() * 300),
      exercises: [
        {
          id: `exercise-${i}-1`,
          name: i % 2 === 0 ? "Bench Press" : "Treadmill Run",
          sets: i % 2 === 0 ? 3 : 1,
          reps: i % 2 === 0 ? 10 : 0,
          weight: i % 2 === 0 ? 135 : 0,
        },
        {
          id: `exercise-${i}-2`,
          name: i % 2 === 0 ? "Squats" : "Cycling",
          sets: i % 2 === 0 ? 3 : 1,
          reps: i % 2 === 0 ? 12 : 0,
          weight: i % 2 === 0 ? 185 : 0,
        }
      ]
    });
  }
  
  // Generate measurement data for the last 30 days
  const measurements: Measurement[] = [];
  for (let i = 0; i < 30; i += 5) {
    const measurementDate = subDays(today, i);
    measurements.push({
      id: `measurement-${i}`,
      date: format(measurementDate, "yyyy-MM-dd"),
      weight: 180 - (i * 0.2),
      bodyFat: 20 - (i * 0.1),
      chestSize: 42,
      waistSize: 34 - (i * 0.1),
      armSize: 14 + (i * 0.05),
      legSize: 22 + (i * 0.05),
    });
  }
  
  // Generate goals
  const goals: Goal[] = [
    {
      id: "goal-1",
      name: "Lose Weight",
      current: 180,
      target: 165,
      unit: "lbs",
      deadline: format(subDays(today, -30), "yyyy-MM-dd"),
      category: 'weight'
    },
    {
      id: "goal-2",
      name: "Bench Press",
      current: 135,
      target: 225,
      unit: "lbs",
      deadline: format(subDays(today, -60), "yyyy-MM-dd"),
      category: 'strength'
    },
    {
      id: "goal-3",
      name: "Run 5K",
      current: 3.5,
      target: 5,
      unit: "km",
      deadline: format(subDays(today, -15), "yyyy-MM-dd"),
      category: 'cardio'
    },
    {
      id: "goal-4",
      name: "Workout Sessions",
      current: 12,
      target: 20,
      unit: "sessions",
      deadline: format(subDays(today, -30), "yyyy-MM-dd"),
      category: 'habit'
    }
  ];
  
  return { workouts, measurements, goals };
};
