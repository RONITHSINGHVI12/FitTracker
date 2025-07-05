import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CertificateProps {
  userData: {
    name: string;
    fitnessLevel: string;
    age: string;
    weight: string;
    height: string;
  };
  workoutData: {
    totalWorkouts: number;
    daysActive: number;
    currentStreak: number;
  };
  onClose: () => void;
}

export function Certificate({ userData, workoutData, onClose }: CertificateProps) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-glow border-2 border-primary bg-white">
        <CardContent className="p-12">
          <div className="text-center space-y-8">
            {/* Header */}
            <div className="border-b-2 border-primary pb-6">
              <h1 className="text-4xl font-bold text-primary mb-2">
                CERTIFICATE OF ACHIEVEMENT
              </h1>
              <p className="text-lg text-secondary">
                FitTracker Fitness Program
              </p>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              <p className="text-xl text-gray-700">
                This is to certify that
              </p>
              
              <h2 className="text-5xl font-bold text-primary uppercase tracking-wide">
                {userData.name}
              </h2>
              
              <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                has successfully completed the <span className="font-semibold text-primary">
                {userData.fitnessLevel.charAt(0).toUpperCase() + userData.fitnessLevel.slice(1)} Level
                </span> fitness program with dedication and commitment, demonstrating exceptional 
                perseverance in their fitness journey.
              </p>

              {/* Achievement Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto my-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{workoutData.totalWorkouts}</div>
                  <div className="text-sm text-gray-600">Total Workouts</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{workoutData.daysActive}</div>
                  <div className="text-sm text-gray-600">Days Active</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{workoutData.currentStreak}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t-2 border-primary pt-6 flex justify-between items-end">
              <div className="text-left">
                <p className="text-sm text-gray-600 mb-1">Date of Completion</p>
                <p className="text-lg font-semibold text-primary">{currentDate}</p>
              </div>
              
              <div className="text-center">
                <div className="w-48 border-b border-gray-400 mb-2"></div>
                <p className="text-sm text-gray-600">FitTracker Fitness App</p>
                <p className="text-xs text-gray-500">Certified Fitness Program</p>
              </div>
              
              <div className="text-right">
                <div className="w-32 h-16 bg-gradient-primary rounded flex items-center justify-center mb-2">
                  <span className="text-white font-bold text-sm">OFFICIAL</span>
                </div>
                <p className="text-xs text-gray-500">Digital Certificate</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center mt-8 print:hidden">
            <Button
              onClick={handlePrint}
              variant="fitness"
              className="px-8"
            >
              Print Certificate
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="px-8"
            >
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}