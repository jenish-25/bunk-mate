
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AttendanceVisualProps {
  percentage: number;
  requiredPercentage: number;
  canBunk: number;
  needToAttend: number;
  status: 'good' | 'warning' | 'danger';
}

const AttendanceVisual = ({
  percentage,
  requiredPercentage,
  canBunk,
  needToAttend,
  status,
}: AttendanceVisualProps) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  
  useEffect(() => {
    // Animate percentage on value change
    const timeout = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 100);
    
    return () => clearTimeout(timeout);
  }, [percentage]);
  
  // Dynamically calculate progress bar width based on percentage
  const progressWidth = Math.min(100, Math.max(0, (animatedPercentage / requiredPercentage) * 100));
  
  const statusConfig = {
    good: {
      bg: 'bg-success/10',
      border: 'border-success/20',
      text: 'text-success',
      progressBg: 'bg-success',
    },
    warning: {
      bg: 'bg-warning/10',
      border: 'border-warning/20',
      text: 'text-warning',
      progressBg: 'bg-warning',
    },
    danger: {
      bg: 'bg-destructive/10',
      border: 'border-destructive/20',
      text: 'text-destructive',
      progressBg: 'bg-destructive',
    },
  };
  
  const config = statusConfig[status];
  
  return (
    <div className={cn(
      "p-6 rounded-xl border backdrop-blur-md transition-all duration-500 animate-fade-in",
      config.bg,
      config.border
    )}>
      <div className="space-y-2 mb-4">
        <h3 className={cn("text-xl font-semibold transition-colors", config.text)}>
          {status === 'good' ? "You're doing great!" : 
           status === 'warning' ? "Almost there!" : 
           "You need to attend more classes!"}
        </h3>
        
        <p className="text-muted-foreground text-sm">
          {status === 'good' 
            ? `You can safely bunk ${canBunk} more ${canBunk === 1 ? 'lecture' : 'lectures'}.`
            : `You need to attend ${needToAttend} more ${needToAttend === 1 ? 'lecture' : 'lectures'} to reach ${requiredPercentage}%.`}
        </p>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium">Current Attendance</span>
          <span className={cn("font-semibold transition-colors", config.text)}>
            {percentage.toFixed(1)}%
          </span>
        </div>
        
        <div className="h-2 w-full bg-background/50 rounded-full overflow-hidden">
          <div 
            className={cn("h-full rounded-full transition-all duration-1000 ease-out", config.progressBg)} 
            style={{ width: `${progressWidth}%` }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0%</span>
          <span>Required: {requiredPercentage}%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};

export default AttendanceVisual;
