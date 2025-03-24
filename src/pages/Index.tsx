
import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [totalClasses, setTotalClasses] = useState("");
  const [attendedClasses, setAttendedClasses] = useState("");
  const [remainingClasses, setRemainingClasses] = useState("");
  const [requiredPercentage, setRequiredPercentage] = useState(75);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateBunks = () => {
    if (!totalClasses || !attendedClasses || !remainingClasses || !requiredPercentage) {
      toast({
        title: "Missing information",
        description: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      // Convert inputs to numbers
      const total = Number(totalClasses);
      const attended = Number(attendedClasses);
      const remaining = Number(remainingClasses);
      const required = Number(requiredPercentage);
      
      // Calculate current attendance
      const currentAttendance = (attended / total) * 100;
      
      // Calculate how many classes can be bunked
      const minRequired = Math.ceil((required / 100) * total);
      const maxBunks = Math.max(0, attended - minRequired + remaining);
      
      // Calculate how many more need to be attended
      const minAttend = Math.max(0, minRequired - attended);
      
      // Set result
      setResult({
        current_attendance: currentAttendance.toFixed(2),
        max_bunks: maxBunks,
        min_attend: minAttend
      });
      
      toast({
        title: "Calculation complete",
        description: `Your current attendance is ${currentAttendance.toFixed(2)}%`,
      });
    } catch (error) {
      console.error("Calculation error:", error);
      toast({
        title: "Calculation error",
        description: "There was an error calculating your attendance",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl animate-float opacity-70"></div>
        <div className="absolute top-3/4 left-1/2 w-96 h-96 bg-success/20 rounded-full mix-blend-multiply filter blur-xl animate-float [animation-delay:2s] opacity-70"></div>
        <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-warning/20 rounded-full mix-blend-multiply filter blur-xl animate-float [animation-delay:4s] opacity-70"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-between w-full relative z-10 px-4 py-8">
        <header className="w-full py-8">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-2 animate-float">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent animate-fade-in">
              Bunk<span className="text-primary">Mate</span>
            </h1>
            <p className="max-w-lg animate-fade-in [animation-delay:100ms] text-muted-foreground">
              Calculate how many lectures you can safely bunk while maintaining attendance requirements
            </p>
          </div>
        </header>
        
        <main className="flex-1 w-full flex items-center justify-center my-6">
          <div className="w-full max-w-md mx-auto space-y-8">
            <div className="space-y-6 glass rounded-2xl p-6 animate-scale">
              <div className="mb-4">
                <label className="block font-semibold text-foreground">Total Number of Lectures</label>
                <input
                  type="number"
                  value={totalClasses}
                  onChange={(e) => setTotalClasses(e.target.value)}
                  className="w-full p-3 mt-1 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter total lectures"
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold text-foreground">Attended Lectures</label>
                <input
                  type="number"
                  value={attendedClasses}
                  onChange={(e) => setAttendedClasses(e.target.value)}
                  className="w-full p-3 mt-1 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter attended lectures"
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold text-foreground">Number of Remaining Lectures</label>
                <input
                  type="number"
                  value={remainingClasses}
                  onChange={(e) => setRemainingClasses(e.target.value)}
                  className="w-full p-3 mt-1 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter remaining lectures"
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold text-foreground">Required Attendance Percentage</label>
                <input
                  type="number"
                  value={requiredPercentage}
                  onChange={(e) => setRequiredPercentage(Number(e.target.value))}
                  className="w-full p-3 mt-1 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter required attendance percentage"
                />
              </div>

              <button
                onClick={calculateBunks}
                className="w-full bg-primary p-3 rounded-lg text-lg font-bold hover:bg-primary/90 transition-all shadow-md text-primary-foreground"
                disabled={loading}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-t-transparent border-white mx-auto"></div>
                ) : (
                  "Check Bunk Availability 🎯"
                )}
              </button>
            </div>
            
            {result && (
              <div className="mt-6 text-center bg-card p-6 rounded-xl shadow-lg w-full animate-fade-in">
                <p className="text-xl font-bold">
                  🏆 YOUR CURRENT ATTENDANCE IS <span className="text-yellow-500">{result.current_attendance}%</span>
                </p>
                <p className="mt-4 space-y-2">
                  <span className="block text-lg">
                    📌 YOU CAN BUNK <span className="text-destructive font-bold">{result.max_bunks}</span> LECTURES
                  </span>
                  <span className="block text-lg">
                    ✅ NEED TO ATTEND <span className="text-success font-bold">{result.min_attend}</span> MORE LECTURES
                  </span>
                </p>
              </div>
            )}
          </div>
        </main>
        
        <footer className="w-full py-6 text-center text-sm text-muted-foreground">
          <p>Made with ❤️ by BunkMate</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
