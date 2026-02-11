'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/lib/constants';
import { ProjectCard } from '@/components/ui/ProjectCard';
import type { SanityProject } from '@/lib/tina';

interface WorkCarouselProps {
  projects?: SanityProject[];
}

export function WorkCarousel({ projects }: WorkCarouselProps) {
  const resolvedProjects = projects ?? PORTFOLIO_DATA.projects;
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    let currentProgress = 0;
    let targetProgress = 0;
    let requestAnimationFrameId: number;

    const animate = () => {
      const { top } = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;

      const scrollDist = containerHeight - windowHeight;

      if (scrollDist > 0) {
        const val = -top / scrollDist;
        targetProgress = Math.max(0, Math.min(1, val));
      }

      currentProgress += (targetProgress - currentProgress) * 0.075;

      track.style.transform = `translateX(calc(-${currentProgress} * (100% - 100vw)))`;

      if (headerRef.current) {
        const header = headerRef.current;
        if (currentProgress > 0.05) {
          const fadeProgress = (currentProgress - 0.05) * 5;
          const opacity = Math.max(0, 1 - fadeProgress);
          const blur = Math.min(10, fadeProgress * 5);
          const yOffset = fadeProgress * -20;

          header.style.opacity = String(opacity);
          header.style.transform = `translateY(${yOffset}px)`;
          header.style.filter = `blur(${blur}px)`;
        } else {
          header.style.opacity = '1';
          header.style.transform = 'translateY(0)';
          header.style.filter = 'blur(0)';
        }
      }

      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${currentProgress * 100}%`;
      }

      requestAnimationFrameId = requestAnimationFrame(animate);
    };

    requestAnimationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(requestAnimationFrameId);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="work"
      className="relative h-[400vh] bg-[#F5F5F0]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="absolute top-12 md:top-24 left-6 md:left-12 z-20 pointer-events-none will-change-[transform,opacity,filter]"
        >
          <span className="text-xs font-medium tracking-[0.3em] uppercase block mb-4 text-accent">
            Selected Works
          </span>
          <h2 className="text-4xl md:text-6xl font-serif leading-none text-primary">
            Digital Canvas
          </h2>
        </div>

        {/* Horizontal Track */}
        <div
          ref={trackRef}
          className="flex gap-8 md:gap-16 px-6 md:px-12 w-max items-center h-[60vh] md:h-[70vh] will-change-transform"
        >
          {/* Intro Spacer */}
          <div className="w-[85vw] md:w-[30vw] shrink-0 flex flex-col justify-end pb-12 pr-12">
            <p className="text-lg md:text-xl text-secondary font-light max-w-sm leading-relaxed hidden md:block">
              A curation of recent digital products, featuring data-intensive
              dashboards and immersive e-commerce experiences.
            </p>
            <div className="mt-8 items-center gap-2 text-primary opacity-60 hidden md:flex">
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <ArrowRight size={16} />
            </div>
          </div>

          {resolvedProjects.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}

          {/* Outro Spacer */}
          <div className="w-[20vw] shrink-0 flex items-center justify-center">
            <Link
              href="/projects"
              className="w-32 h-32 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-[#F5F5F0] transition-all duration-300 group"
            >
              <span className="font-serif italic text-xl">View All</span>
            </Link>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-12 left-6 md:left-12 right-6 md:right-12 h-[2px] bg-primary/5 overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-primary"
            style={{ width: '0%' }}
          />
        </div>
      </div>
    </section>
  );
}
