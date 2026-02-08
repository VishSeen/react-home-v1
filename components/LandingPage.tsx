import React from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { Footer } from './Footer';
import { PORTFOLIO_DATA } from '../constants';
import { Reveal } from './Reveal';
import { ArrowUpRight } from 'lucide-react';

export const LandingPage: React.FC = () => {
    // Duplicating projects to simulate a larger archive for demonstration
    const allProjects = [...PORTFOLIO_DATA.projects, ...PORTFOLIO_DATA.projects];

    return (
        <div className="bg-background min-h-screen text-primary selection:bg-primary/10 selection:text-primary">
            <div className="bg-noise"></div>
            <Navbar />

            {/* Reusing App's Hero design but with Projects content */}
            <Hero
                titleFirst="Selected"
                titleSecond="Works."
                description="A comprehensive index of commercial projects, experimental prototypes, and open source contributions."
                role="2021 — 2025"
                roleLabel="Archive"
                aboutLabel="Index"
            />

            {/* Projects Grid Section */}
            <section className="px-6 md:px-12 py-32 bg-background relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
                        {allProjects.map((project, idx) => (
                            <ProjectItem
                                key={`${project.id}-${idx}`}
                                project={project}
                                index={idx}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

interface ProjectItemProps {
    project: typeof PORTFOLIO_DATA.projects[0];
    index: number;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project, index }) => {
    // Offset every other item for a masonry-like feel
    const isEven = index % 2 === 0;

    return (
        <div className={`group ${!isEven ? 'md:mt-32' : ''}`}>
            <Reveal delay={index % 2 * 200}>
                <div className="relative overflow-hidden aspect-[4/3] mb-8 cursor-pointer">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 grayscale-[10%] group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white">
                            <ArrowUpRight size={24} strokeWidth={1} />
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-start border-t border-primary/10 pt-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-[10px] font-mono text-accent">0{index + 1}</span>
                            <h3 className="text-3xl font-serif text-primary group-hover:italic transition-all">{project.title}</h3>
                        </div>
                        <p className="text-sm text-secondary font-light max-w-sm line-clamp-2">{project.description}</p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                        <span className="text-[10px] uppercase tracking-widest text-primary/40">{project.category}</span>
                        <div className="flex gap-2">
                            {project.tech.slice(0, 2).map((t, i) => (
                                <span key={i} className="text-[9px] px-2 py-1 border border-primary/5 rounded-full text-secondary/60">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </Reveal>
        </div>
    );
};
