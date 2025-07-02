import { useState, useEffect } from "react";
import { UserOnboarding } from "@/components/UserOnboarding";
import { WorkoutDashboard } from "@/components/WorkoutDashboard";

interface UserData {
  name: string;
  age: string;
  weight: string;
  height: string;
  gender: string;
  fitnessLevel: string;
}

const Index = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedUserData = localStorage.getItem("fitnessAppUserData");
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }
  }, []);

  const handleOnboardingComplete = (data: UserData) => {
    setUserData(data);
    localStorage.setItem("fitnessAppUserData", JSON.stringify(data));
  };

  const handleLogout = () => {
    setUserData(null);
    localStorage.removeItem("fitnessAppUserData");
  };

  // Show onboarding if no user data exists
  if (!userData) {
    return <UserOnboarding onComplete={handleOnboardingComplete} />;
  }

  // Show main workout dashboard
  return <WorkoutDashboard userData={userData} onLogout={handleLogout} />;
};

export default Index;
