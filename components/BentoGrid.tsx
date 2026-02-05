import React, { useRef, useEffect, useState } from 'react';
import { PORTFOLIO_DATA } from '../constants';
import { ArrowRight } from 'lucide-react';

export const WorkCarousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // Animation state
    let currentProgress = 0;
    let targetProgress = 0;
    let requestAnimationFrameId: number;

    const animate = () => {
      // 1. Calculate Target Progress
      const { top } = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate how far we've scrolled into the sticky section
      // 'top' is 0 when the section hits the top of the viewport.
      // 'top' becomes negative as we scroll past.
      // The total scrollable distance is containerHeight - windowHeight.
      const scrollDist = containerHeight - windowHeight;
      
      if (scrollDist > 0) {
        // Normalized progress 0 to 1
        const val = -top / scrollDist;
        targetProgress = Math.max(0, Math.min(1, val));
      }

      // 2. Linear Interpolation (Lerp) for smoothness
      // Move currentProgress 7.5% of the way to targetProgress each frame
      currentProgress += (targetProgress - currentProgress) * 0.075;

      // 3. Apply Transforms directly to DOM (Bypassing React Render Cycle)
      
      // Track Transform
      // We use string interpolation for the calc() value
      track.style.transform = `translateX(calc(-${currentProgress} * (100% - 100vw)))`;

      // Header Fade/Blur
      if (headerRef.current) {
        const header = headerRef.current;
        // Start fading out after 5% scroll
        if (currentProgress > 0.05) {
             const fadeProgress = (currentProgress - 0.05) * 5; // Fast fade
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

      // Progress Bar
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${currentProgress * 100}%`;
      }

      requestAnimationFrameId = requestAnimationFrame(animate);
    };

    // Start Loop
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
               A curation of recent digital products, featuring data-intensive dashboards and immersive e-commerce experiences.
             </p>
             <div className="mt-8 flex items-center gap-2 text-primary opacity-60 hidden md:flex">
                <span className="text-xs uppercase tracking-widest">Scroll</span>
                <ArrowRight size={16} />
             </div>
          </div>
          
          {PORTFOLIO_DATA.projects.map((project, idx) => (
             <ProjectCard key={idx} project={project} />
          ))}

          {/* Outro Spacer */}
           <div className="w-[20vw] shrink-0 flex items-center justify-center">
              <a href="#" className="w-32 h-32 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-[#F5F5F0] transition-all duration-300 group">
                  <span className="font-serif italic text-xl">View All</span>
              </a>
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
};

interface ProjectCardProps {
  project: typeof PORTFOLIO_DATA.projects[0];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
   <div className="w-[85vw] md:w-[45vw] lg:w-[35vw] shrink-0 group cursor-pointer">
      <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-gray-200 mb-6 group-hover:shadow-2xl transition-all duration-500">
         <img 
           src={project.image} 
           alt={project.title} 
           className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
         />
         <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
      </div>
      
      <div className="flex justify-between items-start border-t border-primary/20 pt-4 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
         <div className="max-w-[70%]">
            <h3 className="text-2xl md:text-3xl font-serif text-primary mb-2 group-hover:translate-x-2 transition-transform duration-500">{project.title}</h3>
            <p className="text-xs md:text-sm text-secondary font-light leading-relaxed line-clamp-2">{project.description}</p>
         </div>
         <span className="text-xs font-mono text-primary/40 pt-2">
            /{project.id}
         </span>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          {project.tech.slice(0, 3).map((t, i) => (
              <span key={i} className="text-[9px] uppercase tracking-widest border border-primary/20 px-2 py-1 rounded-full text-secondary">
                  {t}
              </span>
          ))}
      </div>
   </div>
);