"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { SanityProject } from "@/lib/sanity";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";

interface ProjectDetailProps {
  project: SanityProject;
  allProjects: SanityProject[];
}

export function ProjectDetail({ project, allProjects }: ProjectDetailProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setMounted(true));
    });
  }, []);

  const currentIndex = allProjects.findIndex(
    (p) => p.slug === project.slug
  );
  const nextProject =
    allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-12 pt-32">
        <div className="max-w-7xl w-full mx-auto">
          <Link
            href="/projects"
            className={`inline-flex items-center gap-2 text-xs uppercase tracking-widest text-secondary hover:text-primary transition-all duration-700 mb-12 ${
              mounted
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            Back to Projects
          </Link>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div
                className={`flex items-center gap-4 mb-4 transition-all duration-700 delay-100 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                <span className="text-xs font-mono text-accent">
                  /{project.id}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-secondary/60">
                  {project.category}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-secondary/60">
                  {project.year}
                </span>
              </div>

              <h1
                className={`text-5xl md:text-7xl lg:text-8xl font-serif text-primary leading-[0.95] transition-all duration-1000 delay-200 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                {project.title}
              </h1>
            </div>

            <p
              className={`text-sm md:text-base text-secondary font-light max-w-sm leading-relaxed transition-all duration-700 delay-300 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="px-6 md:px-12 lg:px-20 pb-24">
        <div
          className={`max-w-7xl mx-auto transition-all duration-1000 delay-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative aspect-[16/9] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Details Grid */}
      <section className="px-6 md:px-12 lg:px-20 pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Meta row */}
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-primary/10 pt-10 pb-16">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-secondary/50 block mb-2">
                  Client
                </span>
                <span className="text-sm text-primary font-light">
                  {project.client}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-secondary/50 block mb-2">
                  Year
                </span>
                <span className="text-sm text-primary font-light">
                  {project.year}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-secondary/50 block mb-2">
                  Category
                </span>
                <span className="text-sm text-primary font-light">
                  {project.category}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-secondary/50 block mb-2">
                  Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="text-[9px] uppercase tracking-widest border border-primary/10 px-2 py-1 rounded-full text-secondary/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Long description */}
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-24">
              <div className="md:col-span-3">
                <h2 className="text-[10px] uppercase tracking-widest text-secondary/50">
                  Overview
                </h2>
              </div>
              <div className="md:col-span-9">
                <p className="text-lg md:text-xl text-primary/80 font-light leading-relaxed">
                  {project.longDescription}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Challenge */}
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-24 border-t border-primary/5 pt-12">
              <div className="md:col-span-3">
                <h2 className="text-[10px] uppercase tracking-widest text-secondary/50">
                  Challenge
                </h2>
              </div>
              <div className="md:col-span-9">
                <p className="text-base md:text-lg text-secondary font-light leading-relaxed">
                  {project.challenge}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Solution */}
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-24 border-t border-primary/5 pt-12">
              <div className="md:col-span-3">
                <h2 className="text-[10px] uppercase tracking-widest text-secondary/50">
                  Solution
                </h2>
              </div>
              <div className="md:col-span-9">
                <p className="text-base md:text-lg text-secondary font-light leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Next Project CTA */}
      <section className="border-t border-primary/10">
        <Link href={`/projects/${nextProject.slug}`} className="group block">
          <div className="px-6 md:px-12 lg:px-20 py-24 md:py-32">
            <Reveal>
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-secondary/50 block mb-4">
                    Next Project
                  </span>
                  <h2 className="text-4xl md:text-6xl font-serif text-primary group-hover:italic transition-all duration-500">
                    {nextProject.title}
                  </h2>
                  <p className="text-sm text-secondary font-light mt-3 max-w-md">
                    {nextProject.description}
                  </p>
                </div>
                <div className="w-16 h-16 border border-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-background transition-all duration-500">
                  <ArrowUpRight
                    size={20}
                    strokeWidth={1}
                    className="group-hover:rotate-45 transition-transform duration-500"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </Link>
      </section>

      <Footer />
    </>
  );
}
