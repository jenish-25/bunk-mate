
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import NumberInput from './NumberInput';
import AttendanceVisual from './AttendanceVisual';
import { Button } from './ui/button';
import { CheckCircle } from 'lucide-react';

const Calculator = () => {
  const { toast } = useToast();
  const [totalLectures, setTotalLectures] = useState(100);
  const [attendedLectures, setAttendedLectures] = useState(75);
  const [remainingLectures, setRemainingLectures] = useState(25);
  const [requiredPercentage, setRequiredPercentage] = useState(75);
  const [isLoading, setIsLoading] = useState(false);
  
  // Calculated values
  const [currentPercentage, setCurrentPercentage] = useState(75);
  const [canBunk, setCanBunk] = useState(0);
  const [needToAttend, setNeedToAttend] = useState(0);
  const [status, setStatus] = useState<'good' | 'warning' | 'danger'>('good');
  const [hasCalculated, setHasCalculated] = useState(false);
  
  // Sync total lectures when attended or remaining changes
  useEffect(() => {
    const calculatedTotal = attendedLectures + remainingLectures;
    if (calculatedTotal !== totalLectures) {
      setTotalLectures(calculatedTotal);
    }
  }, [attendedLectures, remainingLectures]);
  
  // Update remaining lectures when total or attended changes
  useEffect(() => {
    const calculatedRemaining = totalLectures - attendedLectures;
    if (calculatedRemaining !== remainingLectures && calculatedRemaining >= 0) {
      setRemainingLectures(calculatedRemaining);
    }
  }, [totalLectures, attendedLectures]);
  
  // Validate inputs
  useEffect(() => {
    // Ensure attended lectures don't exceed total lectures
    if (attendedLectures > totalLectures) {
      setAttendedLectures(totalLectures);
      toast({
        title: "Attendance adjusted",
        description: "Attended lectures cannot exceed total lectures.",
        variant: "default",
      });
    }
  }, [totalLectures, attendedLectures, toast]);
  
  const calculateAttendance = () => {
    if (totalLectures === 0) {
      toast({
        title: "Invalid input",
        description: "Total lectures must be greater than 0.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Calculate current attendance percentage
      const percentage = (attendedLectures / totalLectures) * 100;
      setCurrentPercentage(percentage);
      
      // Calculate how many more lectures can be bunked
      const minimumLecturesToAttend = Math.ceil((requiredPercentage / 100) * totalLectures);
      const canBunkCount = attendedLectures - minimumLecturesToAttend;
      const maxPossibleBunks = Math.min(remainingLectures, Math.max(0, canBunkCount));
      setCanBunk(maxPossibleBunks);
      
      // Calculate how many more lectures need to be attended
      const needToAttendCount = minimumLecturesToAttend - attendedLectures;
      setNeedToAttend(Math.max(0, needToAttendCount));
      
      // Set status based on current percentage
      if (percentage >= requiredPercentage) {
        setStatus('good');
      } else if (percentage >= requiredPercentage * 0.9) {
        setStatus('warning');
      } else {
        setStatus('danger');
      }
      
      setHasCalculated(true);
      
      toast({
        title: "Calculation complete",
        description: `Your current attendance is ${percentage.toFixed(1)}%`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Calculation error",
        description: "There was an error calculating attendance. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto space-y-8 p-4">
      <div className="space-y-6 glass rounded-2xl p-6 animate-scale">
        <NumberInput
          label="Total Lectures"
          value={totalLectures}
          onChange={setTotalLectures}
          min={1}
          max={500}
          disabled={isLoading}
          className="animate-fade-in"
          hint="Total number of lectures in the course"
        />
        
        <NumberInput
          label="Attended Lectures"
          value={attendedLectures}
          onChange={setAttendedLectures}
          min={0}
          max={totalLectures}
          disabled={isLoading}
          className="animate-fade-in [animation-delay:100ms]"
          hint="Number of lectures you've attended so far"
        />
        
        <NumberInput
          label="Remaining Lectures"
          value={remainingLectures}
          onChange={setRemainingLectures}
          min={0}
          max={500 - attendedLectures}
          disabled={isLoading}
          className="animate-fade-in [animation-delay:150ms]"
          hint="Number of remaining lectures in the course"
        />
        
        <NumberInput
          label="Required Attendance (%)"
          value={requiredPercentage}
          onChange={setRequiredPercentage}
          min={1}
          max={100}
          disabled={isLoading}
          className="animate-fade-in [animation-delay:200ms]"
          hint="Minimum attendance percentage required"
        />
        
        <Button 
          onClick={calculateAttendance} 
          className="w-full h-12 text-lg font-semibold animate-fade-in [animation-delay:250ms] bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-t-transparent border-white mr-2"></div>
          ) : (
            <CheckCircle className="mr-2 h-5 w-5" />
          )}
          Calculate Attendance
        </Button>
      </div>
      
      {hasCalculated && (
        <AttendanceVisual
          percentage={currentPercentage}
          requiredPercentage={requiredPercentage}
          canBunk={canBunk}
          needToAttend={needToAttend}
          status={status}
        />
      )}
    </div>
  );
};

export default Calculator;
