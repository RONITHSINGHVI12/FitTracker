import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserOnboarding } from "@/components/UserOnboarding";
import { WorkoutDashboard } from "@/components/WorkoutDashboard";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

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
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading: authLoading, signOut } = useAuth();

  // Load user data from Supabase when user is authenticated
  useEffect(() => {
    const loadUserData = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (profile) {
          setUserData({
            name: profile.name || '',
            age: profile.age || '',
            weight: profile.weight || '',
            height: profile.height || '',
            gender: profile.gender || '',
            fitnessLevel: profile.fitness_level || ''
          });
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!authLoading) {
      loadUserData();
    }
  }, [user, authLoading]);

  const handleOnboardingComplete = async (data: UserData) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: data.name,
          age: data.age,
          weight: data.weight,
          height: data.height,
          gender: data.gender,
          fitness_level: data.fitnessLevel
        })
        .eq('user_id', user.id);

      if (!error) {
        setUserData(data);
      }
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const handleUserDataUpdate = async (data: UserData) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: data.name,
          age: data.age,
          weight: data.weight,
          height: data.height,
          gender: data.gender,
          fitness_level: data.fitnessLevel
        })
        .eq('user_id', user.id);

      if (!error) {
        setUserData(data);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleLogout = async () => {
    await signOut();
    setUserData(null);
  };

  // Redirect to auth if not authenticated
  if (!authLoading && !user) {
    return <Navigate to="/auth" replace />;
  }

  // Show loading while checking auth or loading user data
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Show onboarding if no user data exists
  if (!userData || !userData.name || !userData.age) {
    return <UserOnboarding onComplete={handleOnboardingComplete} />;
  }

  // Show main workout dashboard
  return <WorkoutDashboard userData={userData} onLogout={handleLogout} onUserDataUpdate={handleUserDataUpdate} />;
};

export default Index;
