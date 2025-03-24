
import React from 'react';
import { GraduationCap, BookOpen } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-2 animate-float">
            <GraduationCap className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent animate-fade-in">
            Bunk<span className="text-primary">Mate</span>
          </h1>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <p className="max-w-lg animate-fade-in [animation-delay:100ms]">
              Calculate how many lectures you can safely bunk while maintaining attendance requirements
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
