'use client';

import { useEffect, useState, useRef } from 'react';
import { PORTFOLIO_DATA } from '@/lib/constants';

interface HeroProps {
  loading?: boolean;
  titleFirst?: string;
  titleSecond?: string;
  description?: string;
  role?: string;
  roleLabel?: string;
  aboutLabel?: string;
}

export function Hero({
  loading = false,
  titleFirst = PORTFOLIO_DATA.hero.titleFirst,
  titleSecond = PORTFOLIO_DATA.hero.titleSecond,
  description = PORTFOLIO_DATA.hero.description,
  role = PORTFOLIO_DATA.role,
  roleLabel = 'Role',
  aboutLabel = 'About',
}: HeroProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getDelay = (ms: number) => (loading ? '0ms' : `${ms}ms`);

  const baseTransition =
    'transition-all duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]';

  return (
    <section
      ref={containerRef}
      className="min-h-screen relative flex flex-col justify-center overflow-hidden px-6 md:px-12 pt-20"
    >
      {/* Main Content Grid */}
      <div className="max-w-[1600px] w-full mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 h-[80vh] items-center">
        {/* Left Col: Role & Description */}
        <div className="hidden md:flex md:col-span-3 flex-col justify-between h-full py-12 order-2 md:order-1">
          <div
            className={`${baseTransition} ${
              loading
                ? 'opacity-0 translate-y-8 blur-sm'
                : 'opacity-100 translate-y-0 blur-0'
            }`}
            style={{ transitionDelay: getDelay(1000) }}
          >
            <span className="block text-xs font-mono uppercase tracking-widest text-secondary mb-2">
              {roleLabel}
            </span>
            <p className="text-primary font-medium">{role}</p>
          </div>

          <div
            className={`${baseTransition} ${
              loading
                ? 'opacity-0 translate-y-8 blur-sm'
                : 'opacity-100 translate-y-0 blur-0'
            }`}
            style={{ transitionDelay: getDelay(1200) }}
          >
            <span className="block text-xs font-mono uppercase tracking-widest text-secondary mb-2">
              {aboutLabel}
            </span>
            <p className="text-sm text-secondary leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Center: Big Text */}
        <div className="col-span-1 md:col-span-6 h-full relative flex items-center justify-center order-1 md:order-2">
          <h1
            className={`absolute top-[15%] md:top-[20%] -left-4 md:-left-24 z-20 text-[12vw] md:text-[9vw] leading-none font-serif text-primary mix-blend-exclusion ${baseTransition} ${
              loading
                ? 'opacity-0 -translate-x-12 blur-md'
                : 'opacity-100 translate-x-0 blur-0'
            }`}
            style={{ transitionDelay: getDelay(800) }}
          >
            {titleFirst}
          </h1>

          <h1
            className={`absolute bottom-[15%] md:bottom-[20%] -right-4 md:-right-32 z-30 text-[12vw] md:text-[9vw] leading-none font-serif italic text-primary ${baseTransition} ${
              loading
                ? 'opacity-0 translate-x-12 blur-md'
                : 'opacity-100 translate-x-0 blur-0'
            }`}
            style={{ transitionDelay: getDelay(300) }}
          >
            {titleSecond}
          </h1>
        </div>

        {/* Right Col: Details & Scroll */}
        <div className="md:col-span-3 h-full flex flex-col justify-end items-end py-12 order-3">
          <div
            className={`text-right ${baseTransition} ${
              loading
                ? 'opacity-0 translate-y-8 blur-sm'
                : 'opacity-100 translate-y-0 blur-0'
            }`}
            style={{ transitionDelay: getDelay(1300) }}
          >
            <span className="block text-xs font-mono uppercase tracking-widest text-secondary mb-2">
              Based in
            </span>
            <p className="text-primary font-medium">
              {PORTFOLIO_DATA.location}
            </p>
          </div>

          <div
            className={`mt-24 flex items-center gap-4 ${baseTransition} ${
              loading
                ? 'opacity-0 translate-y-8'
                : 'opacity-100 translate-y-0'
            }`}
            style={{ transitionDelay: getDelay(400) }}
          >
            <span className="text-[10px] uppercase tracking-widest text-primary/40">
              Scroll
            </span>
            <div className="w-12 h-px bg-primary/20 overflow-hidden relative">
              <div
                className="absolute inset-0 bg-primary w-full h-full animate-[marquee_2s_linear_infinite] origin-left"
                style={{ animationDuration: '1.5s' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
