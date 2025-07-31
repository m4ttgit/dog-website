'use client';

import Image from 'next/image';
import { useState } from 'react';

function Header({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center space-x-3">
          {/* <Image src="/images/logo.svg" alt="ThatDogPage Logo" width={40} height={40} /> */}
          <h1 className="text-2xl font-bold text-primary tracking-tight">ThatDogPage</h1>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-8">
            {children}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-text focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg">
            <ul className="flex flex-col items-center space-y-4 py-4">
              {children}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
