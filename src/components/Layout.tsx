import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  noPadding?: boolean;
  showBowArrow?: boolean;
}

export const Layout = ({ children, noPadding = false, showBowArrow = false }: LayoutProps) => {

  return (
    <div className="min-h-screen bg-kalrav-dark text-white flex flex-col relative">
      <Navbar />

      <main className={`flex-grow ${noPadding ? '' : 'pt-20'}`}>
        {children}
      </main>
      <Footer showBowArrow={showBowArrow} />
    </div>
  );
};
