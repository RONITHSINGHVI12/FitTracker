import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  restTime: number;
  description: string;
  youtubeId: string;
  targetMuscles: string[];
}

interface ExerciseCardProps {
  exercise: Exercise;
  currentSet: number;
  onSetComplete: () => void;
}

export function ExerciseCard({ exercise, currentSet, onSetComplete }: ExerciseCardProps) {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <Card className="shadow-energy border-primary/20">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl text-primary">{exercise.name}</CardTitle>
            <CardDescription className="mt-2">
              Set {currentSet} of {exercise.sets} • {exercise.reps} reps
            </CardDescription>
          </div>
          <Badge className="bg-gradient-primary text-primary-foreground">
            Current Exercise
          </Badge>
        </div>
        <div className="flex gap-2 mt-3">
          {exercise.targetMuscles.map((muscle) => (
            <Badge key={muscle} variant="secondary" className="text-xs">
              {muscle}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="instructions" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
            <TabsTrigger value="video">Video Demo</TabsTrigger>
          </TabsList>
          
          <TabsContent value="instructions" className="mt-4">
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {exercise.description}
              </p>
              
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-primary">Exercise Details:</h4>
                <ul className="space-y-1 text-sm">
                  <li><strong>Reps:</strong> {exercise.reps}</li>
                  <li><strong>Sets:</strong> {exercise.sets}</li>
                  <li><strong>Rest Time:</strong> {exercise.restTime} seconds</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="video" className="mt-4">
            <div className="space-y-4">
              {!showVideo ? (
                <div className="text-center">
                  <Button
                    onClick={() => setShowVideo(true)}
                    className="bg-gradient-secondary hover:shadow-calm"
                  >
                    Load Exercise Demo Video
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Click to load YouTube demonstration
                  </p>
                </div>
              ) : (
                <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${exercise.youtubeId}?rel=0&modestbranding=1`}
                    title={`${exercise.name} demonstration`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 space-y-3">
          <Button
            onClick={onSetComplete}
            className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 font-semibold text-lg py-3"
            size="lg"
          >
            Complete Set {currentSet} ✓
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Take your time and focus on proper form
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}