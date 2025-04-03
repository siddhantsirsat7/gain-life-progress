
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Activity, Weight, Award, CalendarCheck, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Welcome to FitTrack</h1>
            <p className="mt-3 text-xl text-muted-foreground">
              Your personal fitness journey starts here
            </p>
            
            {!user && (
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="gap-2">
                  <Link to="/auth/login">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Link>
                </Button>
                <Button asChild variant="outline" className="gap-2">
                  <Link to="/auth/signup">
                    <UserPlus className="h-4 w-4" />
                    Create Account
                  </Link>
                </Button>
              </div>
            )}
            
            {user && (
              <div className="mt-8">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/dashboard">
                    Go to Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="space-y-0 pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Track Workouts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Log your daily workouts and track your progress over time.
                </CardDescription>
                <Button variant="ghost" size="sm" asChild className="mt-4">
                  <Link to={user ? "/workouts" : "/auth/signup"} className="flex items-center">
                    {user ? "Go to Workouts" : "Sign Up to Start"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="space-y-0 pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Weight className="h-5 w-5 text-primary" />
                  Log Measurements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Record body measurements to visualize your transformation.
                </CardDescription>
                <Button variant="ghost" size="sm" asChild className="mt-4">
                  <Link to={user ? "/measurements" : "/auth/signup"} className="flex items-center">
                    {user ? "Go to Measurements" : "Sign Up to Start"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="space-y-0 pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Set Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Define fitness goals and track your path to achieving them.
                </CardDescription>
                <Button variant="ghost" size="sm" asChild className="mt-4">
                  <Link to={user ? "/goals" : "/auth/signup"} className="flex items-center">
                    {user ? "Go to Goals" : "Sign Up to Start"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="space-y-0 pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <CalendarCheck className="h-5 w-5 text-primary" />
                  Daily Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get an overview of your daily fitness activities and progress.
                </CardDescription>
                <Button variant="ghost" size="sm" asChild className="mt-4">
                  <Link to={user ? "/dashboard" : "/auth/signup"} className="flex items-center">
                    {user ? "Go to Dashboard" : "Sign Up to Start"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary text-primary-foreground">
                <CardTitle>Ready to start tracking your fitness journey?</CardTitle>
                <CardDescription className="text-primary-foreground/90">
                  FitTrack helps you maintain consistency and achieve your fitness goals
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="mb-4">
                  With FitTrack, you can monitor your workouts, track body measurements, and set achievable goals.
                  {user ? " Use the sidebar navigation to explore different features of the application." : " Sign up now to get started."}
                </p>
                <Button asChild>
                  <Link to={user ? "/dashboard" : "/auth/signup"} className="gap-2">
                    {user ? "Go to Dashboard" : "Create Free Account"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
