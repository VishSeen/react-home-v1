import React, { useEffect, useState } from 'react';
import { PORTFOLIO_DATA } from '../constants';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Simulate loading with non-linear progress
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Random increment for organic feel
        const increment = Math.random() * 15;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setIsExiting(true);
        // Trigger app load sequence slightly after curtain starts moving up.
        // The curtain takes 1000ms to exit. Triggering at 200ms allows content to "wake up" under the rising curtain.
        setTimeout(onComplete, 200);
      }, 500);
    }
  }, [progress, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#1A1A1A] text-[#F5F5F0] flex flex-col justify-between p-6 md:p-12 transition-transform duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${isExiting ? '-translate-y-full' : 'translate-y-0'
        }`}
    >
      <div className="flex justify-between items-start opacity-50">
        <span className="font-serif italic text-xl">{PORTFOLIO_DATA.logoName}.</span>
        <span className="text-xs uppercase tracking-widest font-mono">Portfolio 2025</span>
      </div>

      <div className="flex flex-col items-end">
        <div className="text-[15vw] md:text-[12vw] leading-none font-serif flex items-baseline">
          <span>{Math.floor(progress)}</span>
          <span className="text-2xl md:text-4xl opacity-50 ml-2">%</span>
        </div>
        <div className="w-full h-[1px] bg-white/20 mt-4 overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};