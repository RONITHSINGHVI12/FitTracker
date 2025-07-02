import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface RestTimerProps {
  duration: number; // in seconds
  onComplete: () => void;
  nextExercise?: string;
}

export function RestTimer({ duration, onComplete, nextExercise }: RestTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (timeRemaining <= 0) {
      onComplete();
      return;
    }

    if (isPaused) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, isPaused, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((duration - timeRemaining) / duration) * 100;

  return (
    <div className="min-h-screen bg-gradient-secondary flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center shadow-glow border-0">
        <CardHeader>
          <div className="text-6xl mb-4">⏱️</div>
          <CardTitle className="text-2xl font-bold text-secondary">Rest Time</CardTitle>
          <CardDescription>
            {nextExercise ? `Next: ${nextExercise}` : "Completing current exercise"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="text-6xl font-bold text-secondary font-mono">
              {formatTime(timeRemaining)}
            </div>
            
            <Progress 
              value={progressPercentage} 
              className="h-3"
            />
            
            <p className="text-sm text-muted-foreground">
              {Math.round(progressPercentage)}% complete
            </p>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => setIsPaused(!isPaused)}
                className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
              >
                {isPaused ? "Resume" : "Pause"}
              </Button>
              
              <Button
                onClick={onComplete}
                className="bg-gradient-success hover:shadow-glow"
              >
                Skip Rest
              </Button>
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              <p>💧 Stay hydrated</p>
              <p>🧘 Take deep breaths</p>
              <p>💪 Prepare for the next set</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}