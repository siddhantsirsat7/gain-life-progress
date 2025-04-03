
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Award, Clock, Plus, Target } from "lucide-react";
import { generateSampleData } from "@/lib/data";
import { format, parseISO } from "date-fns";
import type { Goal } from "@/lib/data";

const GoalCard = ({ goal }: { goal: Goal }) => {
  const progress = (goal.current / goal.target) * 100;
  const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  let statusColor = "bg-fitness-blue";
  if (progress >= 90) {
    statusColor = "bg-fitness-green";
  } else if (daysLeft < 7) {
    statusColor = "bg-fitness-yellow";
  }

  const getCategoryIcon = () => {
    switch (goal.category) {
      case 'strength':
        return <Award className="h-5 w-5" />;
      case 'cardio':
        return <Activity className="h-5 w-5" />;
      case 'weight':
        return <Weight className="h-5 w-5" />;
      case 'habit':
        return <Calendar className="h-5 w-5" />;
      default:
        return <Target className="h-5 w-5" />;
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className={`h-1 ${statusColor}`}></div>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getCategoryIcon()}
            <span>{goal.name}</span>
          </div>
          <span className="text-sm font-normal text-muted-foreground">
            {Math.round(progress)}% Complete
          </span>
        </CardTitle>
        <CardDescription>
          Target: {goal.target} {goal.unit} by {format(parseISO(goal.deadline), "MMM dd, yyyy")}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-3">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <div>Current: <span className="font-medium text-foreground">{goal.current} {goal.unit}</span></div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{daysLeft} days left</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Import the necessary icons
import { Activity, Calendar, Weight } from "lucide-react";

const Goals = () => {
  const { goals } = generateSampleData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fitness Goals</h1>
          <p className="text-muted-foreground">Track and achieve your fitness targets.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          <span>Set New Goal</span>
        </Button>
      </div>

      {/* Goals Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Goals
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{goals.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Goals
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Completion
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Goals List */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {goals.map(goal => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
    </div>
  );
};

export default Goals;
