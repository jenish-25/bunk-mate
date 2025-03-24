
import React from 'react';
import Header from '@/components/Header';
import Calculator from '@/components/Calculator';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl animate-float opacity-70"></div>
        <div className="absolute top-3/4 left-1/2 w-96 h-96 bg-success/20 rounded-full mix-blend-multiply filter blur-xl animate-float [animation-delay:2s] opacity-70"></div>
        <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-warning/20 rounded-full mix-blend-multiply filter blur-xl animate-float [animation-delay:4s] opacity-70"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-between max-w-5xl mx-auto w-full relative z-10">
        <Header />
        
        <main className="flex-1 w-full flex items-center justify-center py-6 px-4">
          <Calculator />
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
