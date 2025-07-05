import { useState, useEffect } from "react";

interface WorkoutData {
  totalWorkouts: number;
  daysActive: number;
  currentStreak: number;
  lastWorkoutDate: string;
  workoutDates: string[];
  levelStartDate: string;
}

interface UserData {
  name: string;
  age: string;
  weight: string;
  height: string;
  gender: string;
  fitnessLevel: string;
}

export function useWorkoutTracking(userData: UserData) {
  const [workoutData, setWorkoutData] = useState<WorkoutData>({
    totalWorkouts: 0,
    daysActive: 0,
    currentStreak: 0,
    lastWorkoutDate: "",
    workoutDates: [],
    levelStartDate: new Date().toISOString().split('T')[0]
  });

  const [shouldShowCertificate, setShouldShowCertificate] = useState(false);
  const [levelUpgraded, setLevelUpgraded] = useState(false);

  // Load workout data from localStorage
  useEffect(() => {
    const savedWorkoutData = localStorage.getItem("fitnessAppWorkoutData");
    if (savedWorkoutData) {
      setWorkoutData(JSON.parse(savedWorkoutData));
    }
  }, []);

  // Save workout data to localStorage
  const saveWorkoutData = (data: WorkoutData) => {
    setWorkoutData(data);
    localStorage.setItem("fitnessAppWorkoutData", JSON.stringify(data));
  };

  // Check if user should level up
  const checkLevelProgression = (data: WorkoutData) => {
    const daysSinceStart = Math.floor(
      (new Date().getTime() - new Date(data.levelStartDate).getTime()) / (1000 * 60 * 60 * 24)
    );

    let newLevel = userData.fitnessLevel;
    let shouldUpgrade = false;

    if (userData.fitnessLevel === "basic" && daysSinceStart >= 30) {
      newLevel = "intermediate";
      shouldUpgrade = true;
    } else if (userData.fitnessLevel === "intermediate" && daysSinceStart >= 30) {
      newLevel = "advanced";
      shouldUpgrade = true;
    }

    if (shouldUpgrade) {
      const updatedUserData = { ...userData, fitnessLevel: newLevel };
      localStorage.setItem("fitnessAppUserData", JSON.stringify(updatedUserData));
      
      const updatedWorkoutData = {
        ...data,
        levelStartDate: new Date().toISOString().split('T')[0]
      };
      saveWorkoutData(updatedWorkoutData);
      setLevelUpgraded(true);
      
      return { userData: updatedUserData, workoutData: updatedWorkoutData };
    }

    return { userData, workoutData: data };
  };

  // Record a completed workout
  const recordWorkout = () => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    // Don't record if already recorded today
    if (workoutData.lastWorkoutDate === today) {
      setShouldShowCertificate(true);
      return;
    }

    const newWorkoutDates = [...workoutData.workoutDates];
    if (!newWorkoutDates.includes(today)) {
      newWorkoutDates.push(today);
    }

    // Calculate streak
    let newStreak = 1;
    if (workoutData.lastWorkoutDate === yesterday) {
      newStreak = workoutData.currentStreak + 1;
    }

    const updatedData = {
      ...workoutData,
      totalWorkouts: workoutData.totalWorkouts + 1,
      daysActive: newWorkoutDates.length,
      currentStreak: newStreak,
      lastWorkoutDate: today,
      workoutDates: newWorkoutDates
    };

    // Check for level progression
    const { userData: newUserData, workoutData: finalWorkoutData } = checkLevelProgression(updatedData);
    
    saveWorkoutData(finalWorkoutData);
    setShouldShowCertificate(true);

    return newUserData;
  };

  const resetCertificate = () => {
    setShouldShowCertificate(false);
  };

  const resetLevelUpgrade = () => {
    setLevelUpgraded(false);
  };

  return {
    workoutData,
    recordWorkout,
    shouldShowCertificate,
    resetCertificate,
    levelUpgraded,
    resetLevelUpgrade
  };
}