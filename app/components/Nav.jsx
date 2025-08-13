'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/breeds', label: 'Breeds' },
  { href: '/breed-compare', label: 'Compare' },
  { href: '/news', label: 'News' },
  { href: '/courses', label: 'Courses' },
  { href: '/quiz', label: 'Quiz' },
  { href: '/cafes', label: 'Dog Cafes' },
  { href: '/shop', label: 'Shop' },
];

function Nav() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`relative text-base font-medium transition-all duration-200 hover:text-accent ${
              pathname === href 
                ? 'text-primary' 
                : 'text-text/70 hover:text-text'
            }`}
          >
            {label}
            {pathname === href && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full transition-all duration-300"></span>
            )}
          </Link>
        ))}
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden">
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            onClick={() => {
              // Close mobile menu when a link is clicked
              const menuButton = document.querySelector('button[aria-label="Toggle mobile menu"]');
              if (menuButton) {
                menuButton.click();
              }
            }}
            className={`block py-2 px-4 text-base font-medium transition-all duration-200 hover:text-accent ${
              pathname === href 
                ? 'text-primary' 
                : 'text-text/70 hover:text-text'
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </>
  );
}

export default Nav;
