
import React from 'react';
import Header from '@/components/Header';
import Calculator from '@/components/Calculator';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col calculator-bg">
      <div className="flex-1 flex flex-col items-center justify-between max-w-5xl mx-auto w-full">
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
