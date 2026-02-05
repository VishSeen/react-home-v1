import React, { useEffect, useState, useRef } from 'react';
import { PORTFOLIO_DATA } from '../constants';

interface HeroProps {
  loading?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ loading = false }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1

      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Base delay is 0 because we handle logic via onComplete in Preloader.
  // We want to stagger from bottom up because the curtain rises (revealing bottom first).
  // 1. Scroll indicator & Bottom Text (Elegance) - First
  // 2. Image - Middle
  // 3. Top Text (Engineering) & Top Details - Last

  const getDelay = (ms: number) => loading ? '0ms' : `${ms}ms`;

  // Using CSS transition for smoother state change than keyframes
  const baseTransition = "transition-all duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

  // Image tilt effect
  const tiltStyle = {
    transform: `perspective(1000px) rotateX(${mousePos.y * -5}deg) rotateY(${mousePos.x * 5}deg) scale(1.05)`,
    transition: 'transform 0.4s ease-out'
  };

  return (
    <section ref={containerRef} className="min-h-screen relative flex flex-col justify-center overflow-hidden px-6 md:px-12 pt-20">

      {/* Global Grain Overlay */}
      <div className="bg-noise"></div>

      {/* Main Content Grid */}
      <div className="max-w-[1600px] w-full mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 h-[80vh] items-center">

        {/* Left Col: Role & Description */}
        <div className="hidden md:flex md:col-span-3 flex-col justify-between h-full py-12 order-2 md:order-1">
          <div className={`${baseTransition} ${loading ? 'opacity-0 translate-y-8 blur-sm' : 'opacity-100 translate-y-0 blur-0'}`} style={{ transitionDelay: getDelay(1000) }}>
            <span className="block text-xs font-mono uppercase tracking-widest text-secondary mb-2">Role</span>
            <p className="text-primary font-medium">{PORTFOLIO_DATA.role}</p>
          </div>

          <div className={`${baseTransition} ${loading ? 'opacity-0 translate-y-8 blur-sm' : 'opacity-100 translate-y-0 blur-0'}`} style={{ transitionDelay: getDelay(1200) }}>
            <span className="block text-xs font-mono uppercase tracking-widest text-secondary mb-2">About</span>
            <p className="text-sm text-secondary leading-relaxed">{PORTFOLIO_DATA.hero.description}</p>
          </div>
        </div>

        {/* Center: Image & Big Text */}
        <div className="col-span-1 md:col-span-6 h-full relative flex items-center justify-center order-1 md:order-2">

          {/* Main Image Container */}
          {/* <div
            className={`relative z-10 w-[80vw] md:w-[28vw] aspect-[3/4] overflow-hidden bg-gray-200 ${baseTransition} ${loading ? 'opacity-0 scale-95 clip-path-inset' : 'opacity-100 scale-100'}`}
            style={{ transitionDelay: getDelay(500) }}
          >
            <div className="w-full h-full" style={tiltStyle}>
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                alt="Abstract Architecture"
                className="w-full h-full object-cover opacity-90 grayscale-[20%] contrast-[1.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent mix-blend-multiply opacity-60"></div>
            </div>
          </div> */}

          {/* Typography Layer 1: "Engineering" - Top (Later Reveal) */}
          <h1
            className={`absolute top-[15%] md:top-[20%] -left-4 md:-left-24 z-20 text-[12vw] md:text-[9vw] leading-none font-serif text-primary mix-blend-exclusion ${baseTransition} ${loading ? 'opacity-0 -translate-x-12 blur-md' : 'opacity-100 translate-x-0 blur-0'}`}
            style={{ transitionDelay: getDelay(800) }}
          >
            {PORTFOLIO_DATA.hero.titleFirst}
          </h1>

          {/* Typography Layer 2: "Elegance" - Bottom (Earlier Reveal) */}
          <h1
            className={`absolute bottom-[15%] md:bottom-[20%] -right-4 md:-right-32 z-30 text-[12vw] md:text-[9vw] leading-none font-serif italic text-primary ${baseTransition} ${loading ? 'opacity-0 translate-x-12 blur-md' : 'opacity-100 translate-x-0 blur-0'}`}
            style={{ transitionDelay: getDelay(300) }}
          >
            {PORTFOLIO_DATA.hero.titleSecond}
          </h1>
        </div>

        {/* Right Col: Details & Scroll */}
        <div className="md:col-span-3 h-full flex flex-col justify-end items-end py-12 order-3">
          <div className={`text-right ${baseTransition} ${loading ? 'opacity-0 translate-y-8 blur-sm' : 'opacity-100 translate-y-0 blur-0'}`} style={{ transitionDelay: getDelay(1300) }}>
            <span className="block text-xs font-mono uppercase tracking-widest text-secondary mb-2">Based in</span>
            <p className="text-primary font-medium">{PORTFOLIO_DATA.location}</p>
          </div>

          {/* Scroll - Bottom element, reveal early */}
          <div className={`mt-24 flex items-center gap-4 ${baseTransition} ${loading ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`} style={{ transitionDelay: getDelay(400) }}>
            <span className="text-[10px] uppercase tracking-widest text-primary/40">Scroll</span>
            <div className="w-12 h-px bg-primary/20 overflow-hidden relative">
              <div className="absolute inset-0 bg-primary w-full h-full animate-[marquee_2s_linear_infinite] origin-left" style={{ animationDuration: '1.5s' }}></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};