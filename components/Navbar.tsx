import React, { useEffect, useState } from 'react';
import { PORTFOLIO_DATA } from '../constants';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Trigger mount animation after a delay (wait for hero to start)
    const timer = setTimeout(() => setMounted(true), 1200);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'Projects', to: '#work', id: '01' },
    { name: 'Profile', to: '#about', id: '02' },
    { name: 'Contact', to: '#contact', id: '03' }
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[95] px-6 md:px-12 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${scrolled && !isOpen ? 'py-4 bg-[#F5F5F0]/80 backdrop-blur-md border-b border-primary/5' : 'py-6 md:py-8 bg-transparent'
          } ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
      >
        <div className="flex justify-between items-center relative">
          {/* Logo */}
          <a href="#" className={`font-serif text-2xl tracking-tight relative z-[70] transition-colors duration-500 ${isOpen ? 'text-[#F5F5F0]' : 'text-primary'}`}>
            {PORTFOLIO_DATA.logoName}.
          </a>

          {/* Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`group flex items-center gap-4 relative z-[70] transition-colors duration-500 ${isOpen ? 'text-[#F5F5F0]' : 'text-primary'}`}
            aria-label="Toggle Menu"
          >
            <span className="text-xs font-medium tracking-[0.2em] uppercase hidden md:block opacity-60 group-hover:opacity-100 transition-opacity">
              {isOpen ? 'Close' : 'Menu'}
            </span>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-500 ${isOpen ? 'border-[#F5F5F0]/20 bg-[#F5F5F0]/10 rotate-90' : 'border-primary/10 hover:border-primary/30 hover:bg-primary/5'}`}>
              {isOpen ? <X size={20} strokeWidth={1} /> : <Menu size={20} strokeWidth={1} />}
            </div>
          </button>
        </div>
      </nav>

      {/* Full Screen Overlay */}
      <div
        className={`fixed inset-0 z-[90] bg-[#1A1A1A] flex flex-col justify-center px-6 md:px-12 transition-all duration-1000 ease-[cubic-bezier(0.87,0,0.13,1)] ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-50'}`}
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 pt-24">

          {/* Navigation Links */}
          <div className="lg:col-span-8 flex flex-col space-y-2">
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.to}
                onClick={handleLinkClick}
                className={`group relative flex items-baseline gap-4 text-5xl md:text-7xl lg:text-8xl font-serif text-[#F5F5F0] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                style={{ transitionDelay: `${200 + (idx * 100)}ms` }}
              >
                <span className="text-xs md:text-sm font-sans text-accent tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -left-8 md:-left-12 top-1/2 -translate-y-1/2 hidden md:block">
                  /{link.id}
                </span>
                <span className="italic opacity-50 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-4">
                  {link.name}
                </span>
              </a>
            ))}
          </div>

          {/* Secondary Info */}
          <div
            className={`lg:col-span-4 flex flex-col justify-end text-[#F5F5F0]/60 text-sm font-light space-y-12 transition-all duration-1000 delay-500 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div>
              <span className="block text-xs uppercase tracking-widest text-[#F5F5F0]/40 mb-4 border-b border-[#F5F5F0]/10 pb-2">Get in touch</span>
              <a href={`mailto:${PORTFOLIO_DATA.email}`} className="block text-xl md:text-2xl text-[#F5F5F0] hover:text-accent transition-colors mt-4">
                {PORTFOLIO_DATA.email}
              </a>
            </div>

            <div>
              <span className="block text-xs uppercase tracking-widest text-[#F5F5F0]/40 mb-4 border-b border-[#F5F5F0]/10 pb-2">Connect</span>
              <div className="flex flex-col gap-2 mt-4">
                <a href={PORTFOLIO_DATA.socials.linkedin} className="hover:text-white transition-colors hover:translate-x-2 duration-300 w-fit">LinkedIn</a>
                <a href={PORTFOLIO_DATA.socials.instagram} className="hover:text-white transition-colors hover:translate-x-2 duration-300 w-fit">Instagram</a>
                <a href={PORTFOLIO_DATA.socials.github} className="hover:text-white transition-colors hover:translate-x-2 duration-300 w-fit">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};