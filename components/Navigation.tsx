import React from 'react';
import { PageView } from '../types';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  currentPage: PageView;
  setPage: (page: PageView) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, setPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems: { id: PageView; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'works', label: 'Works' },
    { id: 'about', label: 'About' },
  ];

  const handleNav = (id: PageView) => {
      setPage(id);
      setIsOpen(false);
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-40 px-6 py-6 flex justify-between items-center mix-blend-difference text-white">
      <div 
        className="text-xl font-display font-bold tracking-widest cursor-pointer hover:opacity-70 transition-opacity uppercase"
        onClick={() => handleNav('home')}
      >
        chen kaiying
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex gap-12">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNav(item.id)}
            className={`text-sm tracking-widest uppercase transition-all duration-300 relative group ${
              currentPage === item.id ? 'text-white font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            {item.label}
            {currentPage === item.id && (
                <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-neon-blue shadow-[0_0_8px_rgba(0,243,255,0.8)]" />
            )}
            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
          </button>
        ))}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X /> : <Menu />}
          </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
          <div className="absolute top-20 right-6 w-48 bg-neutral-900/90 backdrop-blur-lg border border-neutral-800 rounded-lg p-4 flex flex-col gap-4 md:hidden">
            {navItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className={`text-left text-sm uppercase ${currentPage === item.id ? 'text-neon-blue' : 'text-white'}`}
                >
                    {item.label}
                </button>
            ))}
          </div>
      )}
    </nav>
  );
};

export default Navigation;