
import React from 'react';
import { cn } from '@/lib/utils';
import { Trophy, AlertTriangle, AlertCircle, Archive, School } from 'lucide-react';

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
  // Dynamically calculate progress bar width based on percentage
  const progressWidth = Math.min(100, Math.max(0, (percentage / requiredPercentage) * 100));
  
  const statusConfig = {
    good: {
      bg: 'bg-success/10',
      border: 'border-success/20',
      text: 'text-success',
      progressBg: 'bg-success',
      icon: <Trophy className="h-6 w-6 text-success" />,
    },
    warning: {
      bg: 'bg-warning/10',
      border: 'border-warning/20',
      text: 'text-warning',
      progressBg: 'bg-warning',
      icon: <AlertTriangle className="h-6 w-6 text-warning" />,
    },
    danger: {
      bg: 'bg-destructive/10',
      border: 'border-destructive/20',
      text: 'text-destructive',
      progressBg: 'bg-destructive',
      icon: <AlertCircle className="h-6 w-6 text-destructive" />,
    },
  };
  
  const config = statusConfig[status];
  
  return (
    <div className={cn(
      "p-6 rounded-xl border backdrop-blur-md transition-all duration-500 animate-fade-in shadow-lg",
      config.bg,
      config.border
    )}>
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          {config.icon}
          <h3 className={cn("text-xl font-semibold transition-colors", config.text)}>
            {status === 'good' ? "You're doing great!" : 
             status === 'warning' ? "Almost there!" : 
             "You need to attend more classes!"}
          </h3>
        </div>
        
        <p className="text-muted-foreground text-sm">
          {status === 'good' 
            ? `You can safely bunk ${canBunk} more ${canBunk === 1 ? 'lecture' : 'lectures'}.`
            : `You need to attend ${needToAttend} more ${needToAttend === 1 ? 'lecture' : 'lectures'} to reach ${requiredPercentage}%.`}
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between text-sm items-center">
          <span className="font-medium">Current Attendance</span>
          <span className={cn("font-semibold transition-colors text-lg", config.text)}>
            {percentage.toFixed(1)}%
          </span>
        </div>
        
        <div className="h-3 w-full bg-background/50 rounded-full overflow-hidden">
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
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className={cn(
            "flex flex-col items-center p-4 rounded-lg transition-all",
            "bg-background/20 hover:bg-background/30 animate-fade-in"
          )}>
            <Archive className="h-6 w-6 mb-2 text-primary" />
            <p className="text-xs text-muted-foreground">Can Bunk</p>
            <p className={cn("text-2xl font-bold", config.text)}>{canBunk}</p>
          </div>
          <div className={cn(
            "flex flex-col items-center p-4 rounded-lg transition-all",
            "bg-background/20 hover:bg-background/30 animate-fade-in [animation-delay:100ms]"
          )}>
            <School className="h-6 w-6 mb-2 text-primary" />
            <p className="text-xs text-muted-foreground">Need to Attend</p>
            <p className={cn("text-2xl font-bold", needToAttend > 0 ? "text-destructive" : "text-success")}>
              {needToAttend}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceVisual;
