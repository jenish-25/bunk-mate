
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
  hint?: string;
}

const NumberInput = ({
  label,
  value,
  onChange,
  min = 0,
  max = 1000,
  disabled = false,
  className,
  hint,
}: NumberInputProps) => {
  const [localValue, setLocalValue] = useState<string>(value.toString());
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    // Update local value when prop value changes from outside
    setLocalValue(value.toString());
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Allow empty string for better UX during typing
    setLocalValue(newValue);
    
    // Only update parent's state if it's a valid number
    if (newValue !== '') {
      const numValue = parseInt(newValue, 10);
      
      // Ensure value is within min-max range
      if (!isNaN(numValue)) {
        if (numValue < min) {
          onChange(min);
        } else if (max !== undefined && numValue > max) {
          onChange(max);
        } else {
          onChange(numValue);
        }
      }
    }
  };

  // When input loses focus, reset the display value to valid number
  const handleBlur = () => {
    setIsFocused(false);
    
    if (localValue === '') {
      setLocalValue(min.toString());
      onChange(min);
    } else {
      const numValue = parseInt(localValue, 10);
      if (isNaN(numValue)) {
        setLocalValue(min.toString());
        onChange(min);
      } else if (numValue < min) {
        setLocalValue(min.toString());
        onChange(min);
      } else if (max !== undefined && numValue > max) {
        setLocalValue(max.toString());
        onChange(max);
      }
    }
  };

  const increment = () => {
    if (disabled) return;
    const currentValue = parseInt(localValue, 10) || 0;
    const newValue = Math.min(currentValue + 1, max);
    setLocalValue(newValue.toString());
    onChange(newValue);
  };

  const decrement = () => {
    if (disabled) return;
    const currentValue = parseInt(localValue, 10) || 0;
    const newValue = Math.max(currentValue - 1, min);
    setLocalValue(newValue.toString());
    onChange(newValue);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <label className="block text-sm font-medium text-foreground/90">
        {label}
      </label>
      
      <div className={cn(
        "group flex items-center rounded-lg border bg-background shadow-sm transition-all duration-200",
        isFocused ? "border-primary ring-1 ring-primary" : "border-input",
        disabled ? "opacity-60 cursor-not-allowed" : "hover:border-primary/50",
      )}>
        <button
          type="button"
          onClick={decrement}
          disabled={disabled || value <= min}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-l-lg text-muted-foreground transition-colors",
            !disabled && value > min && "hover:text-foreground hover:bg-muted",
            disabled && "cursor-not-allowed",
            value <= min && "opacity-50"
          )}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
          >
            <path
              d="M5 7.5H10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        
        <input
          type="number"
          inputMode="numeric"
          value={localValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          min={min}
          max={max}
          disabled={disabled}
          className={cn(
            "w-full h-10 bg-transparent px-3 py-2 text-center text-base text-foreground input-number-hidden focus:outline-none",
            disabled && "cursor-not-allowed"
          )}
        />
        
        <button
          type="button"
          onClick={increment}
          disabled={disabled || (max !== undefined && value >= max)}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-r-lg text-muted-foreground transition-colors",
            !disabled && (max === undefined || value < max) && "hover:text-foreground hover:bg-muted",
            disabled && "cursor-not-allowed",
            max !== undefined && value >= max && "opacity-50"
          )}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
          >
            <path
              d="M5 7.5H10M7.5 5V10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      
      {hint && (
        <p className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  );
};

export default NumberInput;
