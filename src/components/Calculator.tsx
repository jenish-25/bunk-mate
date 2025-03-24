
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import NumberInput from './NumberInput';
import AttendanceVisual from './AttendanceVisual';

const Calculator = () => {
  const { toast } = useToast();
  const [totalLectures, setTotalLectures] = useState(100);
  const [attendedLectures, setAttendedLectures] = useState(75);
  const [remainingLectures, setRemainingLectures] = useState(25);
  const [requiredPercentage, setRequiredPercentage] = useState(75);
  const [isLoading, setIsLoading] = useState(false);
  
  // Calculated values
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const [canBunk, setCanBunk] = useState(0);
  const [needToAttend, setNeedToAttend] = useState(0);
  const [status, setStatus] = useState<'good' | 'warning' | 'danger'>('good');
  
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
    
    // Calculate results with debounce
    const timer = setTimeout(() => {
      calculateAttendance();
    }, 300);
    
    return () => clearTimeout(timer);
  }, [totalLectures, attendedLectures, requiredPercentage, remainingLectures]);
  
  const calculateAttendance = async () => {
    if (totalLectures === 0) return;
    
    setIsLoading(true);
    
    // Simulate API call (could be replaced with real API call like in the example)
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
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
      <div className="space-y-6 glass rounded-2xl p-6 animate-fade-in">
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
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-40 glass rounded-2xl animate-pulse-slow">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
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
