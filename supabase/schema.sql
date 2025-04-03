
-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT,
  full_name TEXT,
  avatar_url TEXT
);

-- Create workouts table
CREATE TABLE IF NOT EXISTS workouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  date DATE NOT NULL,
  notes TEXT,
  duration INTEGER NOT NULL, -- minutes
  calories_burned INTEGER
);

-- Create exercises table
CREATE TABLE IF NOT EXISTS exercises (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  workout_id UUID REFERENCES workouts(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  sets INTEGER NOT NULL,
  reps INTEGER NOT NULL,
  weight INTEGER, -- in pounds/kg
  duration INTEGER, -- in seconds
  notes TEXT
);

-- Create measurements table
CREATE TABLE IF NOT EXISTS measurements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  weight DECIMAL(5,2), -- in pounds/kg
  body_fat DECIMAL(4,2), -- in percentage
  chest DECIMAL(5,2), -- in inches/cm
  waist DECIMAL(5,2), -- in inches/cm
  hips DECIMAL(5,2), -- in inches/cm
  arms DECIMAL(5,2), -- in inches/cm
  thighs DECIMAL(5,2), -- in inches/cm
  notes TEXT
);

-- Create goals table
CREATE TABLE IF NOT EXISTS goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  target_date DATE,
  achieved BOOLEAN DEFAULT FALSE,
  category TEXT CHECK (category IN ('weight', 'strength', 'cardio', 'other')) NOT NULL,
  target_value DECIMAL(8,2),
  current_value DECIMAL(8,2),
  unit TEXT
);

-- Set up RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Profiles: Users can only view and update their own profile
CREATE POLICY "Users can view own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Workouts: Users can CRUD their own workouts
CREATE POLICY "Users can view own workouts" 
  ON workouts FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own workouts" 
  ON workouts FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own workouts" 
  ON workouts FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own workouts" 
  ON workouts FOR DELETE 
  USING (auth.uid() = user_id);

-- Exercises: Users can CRUD exercises in their workouts
CREATE POLICY "Users can view own exercises" 
  ON exercises FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM workouts 
    WHERE workouts.id = exercises.workout_id 
    AND workouts.user_id = auth.uid()
  ));

CREATE POLICY "Users can create own exercises" 
  ON exercises FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM workouts 
    WHERE workouts.id = exercises.workout_id 
    AND workouts.user_id = auth.uid()
  ));

CREATE POLICY "Users can update own exercises" 
  ON exercises FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM workouts 
    WHERE workouts.id = exercises.workout_id 
    AND workouts.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete own exercises" 
  ON exercises FOR DELETE 
  USING (EXISTS (
    SELECT 1 FROM workouts 
    WHERE workouts.id = exercises.workout_id 
    AND workouts.user_id = auth.uid()
  ));

-- Measurements: Users can CRUD their own measurements
CREATE POLICY "Users can view own measurements" 
  ON measurements FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own measurements" 
  ON measurements FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own measurements" 
  ON measurements FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own measurements" 
  ON measurements FOR DELETE 
  USING (auth.uid() = user_id);

-- Goals: Users can CRUD their own goals
CREATE POLICY "Users can view own goals" 
  ON goals FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own goals" 
  ON goals FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own goals" 
  ON goals FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own goals" 
  ON goals FOR DELETE 
  USING (auth.uid() = user_id);

-- Create function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name'
  );
  RETURN new;
END;
$$;

-- Trigger the function every time a user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
