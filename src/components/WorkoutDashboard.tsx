import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ExerciseCard } from "./ExerciseCard";
import { RestTimer } from "./RestTimer";
import heroImage from "@/assets/fitness-hero.jpg";

interface UserData {
  name: string;
  age: string;
  weight: string;
  height: string;
  gender: string;
  fitnessLevel: string;
}

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  restTime: number;
  description: string;
  youtubeId: string;
  targetMuscles: string[];
}

interface WorkoutDashboardProps {
  userData: UserData;
  onLogout: () => void;
}

export function WorkoutDashboard({ userData, onLogout }: WorkoutDashboardProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [workoutProgress, setWorkoutProgress] = useState(0);

  const workouts = {
    basic: [
      {
        name: "Push-ups",
        sets: 3,
        reps: "8-12",
        restTime: 60,
        description: "A basic upper body exercise that targets chest, shoulders, and triceps. Start with modified push-ups if needed.",
        youtubeId: "IODxDxX7oi4",
        targetMuscles: ["Chest", "Shoulders", "Triceps"]
      },
      {
        name: "Bodyweight Squats",
        sets: 3,
        reps: "10-15",
        restTime: 60,
        description: "A fundamental lower body exercise that strengthens your legs and glutes. Focus on proper form.",
        youtubeId: "aclHkVaku9U",
        targetMuscles: ["Quadriceps", "Glutes", "Hamstrings"]
      },
      {
        name: "Plank",
        sets: 3,
        reps: "30-45 sec",
        restTime: 45,
        description: "Core strengthening exercise. Maintain a straight line from head to heels.",
        youtubeId: "ASdvN_XEl_c",
        targetMuscles: ["Core", "Shoulders"]
      }
    ],
    intermediate: [
      {
        name: "Burpees",
        sets: 3,
        reps: "8-12",
        restTime: 90,
        description: "Full body exercise combining a squat, push-up, and jump. Great for cardio and strength.",
        youtubeId: "TU8QYVW0gDU",
        targetMuscles: ["Full Body", "Cardio"]
      },
      {
        name: "Mountain Climbers",
        sets: 3,
        reps: "20-30",
        restTime: 60,
        description: "Dynamic core exercise that also provides cardio benefits. Keep your core tight.",
        youtubeId: "nmwgirgXLYM",
        targetMuscles: ["Core", "Cardio", "Shoulders"]
      },
      {
        name: "Jump Squats",
        sets: 3,
        reps: "12-15",
        restTime: 75,
        description: "Explosive lower body exercise that builds power and strength in your legs.",
        youtubeId: "YGGq0AE5Uyc",
        targetMuscles: ["Quadriceps", "Glutes", "Calves"]
      },
      {
        name: "Pike Push-ups",
        sets: 3,
        reps: "8-12",
        restTime: 75,
        description: "Targets shoulders and upper chest. Great progression towards handstand push-ups.",
        youtubeId: "x4YNjsWKUr8",
        targetMuscles: ["Shoulders", "Triceps", "Upper Chest"]
      }
    ],
    advanced: [
      {
        name: "Pistol Squats",
        sets: 3,
        reps: "5-8 each leg",
        restTime: 120,
        description: "Single-leg squat that requires significant strength, balance, and mobility.",
        youtubeId: "vq5-vdgJc0I",
        targetMuscles: ["Quadriceps", "Glutes", "Balance"]
      },
      {
        name: "One-Arm Push-ups",
        sets: 3,
        reps: "3-6 each arm",
        restTime: 120,
        description: "Advanced push-up variation requiring significant upper body strength and core stability.",
        youtubeId: "IZqOqO7bTlw",
        targetMuscles: ["Chest", "Triceps", "Core"]
      },
      {
        name: "Handstand Push-ups",
        sets: 3,
        reps: "5-10",
        restTime: 150,
        description: "Inverted pressing movement that builds incredible shoulder and arm strength.",
        youtubeId: "tQhrk6WMcKw",
        targetMuscles: ["Shoulders", "Triceps", "Core"]
      },
      {
        name: "Muscle-ups",
        sets: 3,
        reps: "3-6",
        restTime: 180,
        description: "Combination of pull-up and dip that requires explosive pulling power.",
        youtubeId: "BZYUfp-73Xw",
        targetMuscles: ["Back", "Biceps", "Triceps"]
      }
    ]
  };

  const todaysWorkout = workouts[userData.fitnessLevel as keyof typeof workouts] || workouts.basic;
  const currentExercise = todaysWorkout[currentExerciseIndex];

  useEffect(() => {
    const totalSets = todaysWorkout.reduce((acc, exercise) => acc + exercise.sets, 0);
    const completedSets = todaysWorkout.slice(0, currentExerciseIndex).reduce((acc, exercise) => acc + exercise.sets, 0) + (currentSet - 1);
    setWorkoutProgress((completedSets / totalSets) * 100);
  }, [currentExerciseIndex, currentSet, todaysWorkout]);

  const handleSetComplete = () => {
    if (currentSet < currentExercise.sets) {
      setIsResting(true);
    } else {
      // Move to next exercise
      if (currentExerciseIndex < todaysWorkout.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setCurrentSet(1);
        setIsResting(true);
      } else {
        // Workout complete
        setWorkoutProgress(100);
      }
    }
  };

  const handleRestComplete = () => {
    setIsResting(false);
    if (currentSet < currentExercise.sets) {
      setCurrentSet(currentSet + 1);
    }
  };

  if (isResting) {
    return (
      <RestTimer
        duration={currentExercise.restTime}
        onComplete={handleRestComplete}
        nextExercise={currentSet < currentExercise.sets ? currentExercise.name : todaysWorkout[currentExerciseIndex + 1]?.name}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-primary overflow-hidden">
        <img
          src={heroImage}
          alt="Fitness Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/60" />
        <div className="relative z-10 h-full flex items-center justify-center text-center text-primary-foreground">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {userData.name}!</h1>
            <p className="text-lg opacity-90">Ready for today's {userData.fitnessLevel} workout?</p>
            <Button
              variant="outline"
              onClick={onLogout}
              className="mt-4 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Change Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Workout Progress */}
      <div className="container mx-auto px-4 py-6">
        <Card className="mb-6 shadow-calm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Today's Workout Progress</span>
              <Badge variant="secondary" className="bg-gradient-secondary text-secondary-foreground">
                {userData.fitnessLevel.charAt(0).toUpperCase() + userData.fitnessLevel.slice(1)}
              </Badge>
            </CardTitle>
            <CardDescription>
              Exercise {currentExerciseIndex + 1} of {todaysWorkout.length} • Set {currentSet} of {currentExercise.sets}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={workoutProgress} className="mb-2" />
            <p className="text-sm text-muted-foreground">{Math.round(workoutProgress)}% Complete</p>
          </CardContent>
        </Card>

        {/* Current Exercise */}
        {workoutProgress < 100 ? (
          <ExerciseCard
            exercise={currentExercise}
            currentSet={currentSet}
            onSetComplete={handleSetComplete}
          />
        ) : (
          <Card className="text-center shadow-glow border-fitness-success">
            <CardContent className="py-12">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-fitness-success mb-2">Workout Complete!</h2>
              <p className="text-muted-foreground mb-6">
                Great job completing today's {userData.fitnessLevel} workout!
              </p>
              <Button 
                onClick={() => {
                  setCurrentExerciseIndex(0);
                  setCurrentSet(1);
                  setWorkoutProgress(0);
                }}
                className="bg-gradient-success hover:shadow-glow"
              >
                Start New Workout
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Next Exercises Preview */}
        {workoutProgress < 100 && currentExerciseIndex < todaysWorkout.length - 1 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Coming Up Next</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {todaysWorkout.slice(currentExerciseIndex + 1, currentExerciseIndex + 3).map((exercise, index) => (
                <Card key={index} className="opacity-75">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{exercise.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex gap-2">
                      {exercise.targetMuscles.map((muscle) => (
                        <Badge key={muscle} variant="outline" className="text-xs">
                          {muscle}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}