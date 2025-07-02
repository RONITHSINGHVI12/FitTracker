import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface UserData {
  name: string;
  age: string;
  weight: string;
  height: string;
  gender: string;
  fitnessLevel: string;
}

interface UserOnboardingProps {
  onComplete: (userData: UserData) => void;
}

export function UserOnboarding({ onComplete }: UserOnboardingProps) {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    age: "",
    weight: "",
    height: "",
    gender: "",
    fitnessLevel: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(userData).every(value => value.trim() !== "")) {
      onComplete(userData);
    }
  };

  const updateField = (field: keyof UserData, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-glow border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Welcome to FitTracker
          </CardTitle>
          <CardDescription>
            Let's personalize your fitness journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={userData.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Your name"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={userData.age}
                  onChange={(e) => updateField("age", e.target.value)}
                  placeholder="25"
                  min="13"
                  max="100"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={userData.weight}
                  onChange={(e) => updateField("weight", e.target.value)}
                  placeholder="70"
                  min="30"
                  max="300"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                value={userData.height}
                onChange={(e) => updateField("height", e.target.value)}
                placeholder="175"
                min="100"
                max="250"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Gender</Label>
              <Select value={userData.gender} onValueChange={(value) => updateField("gender", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Fitness Level</Label>
              <Select value={userData.fitnessLevel} onValueChange={(value) => updateField("fitnessLevel", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select fitness level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic - New to fitness</SelectItem>
                  <SelectItem value="intermediate">Intermediate - Some experience</SelectItem>
                  <SelectItem value="advanced">Advanced - Experienced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 font-semibold"
              disabled={!Object.values(userData).every(value => value.trim() !== "")}
            >
              Start My Fitness Journey
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}