
import React from 'react';

const Header = () => {
  return (
    <header className="w-full py-6 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight animate-fade-in">
            Bunk<span className="text-primary">Mate</span>
          </h1>
          <p className="text-muted-foreground max-w-lg animate-fade-in [animation-delay:100ms]">
            Calculate how many lectures you can safely bunk while maintaining your required attendance.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
