import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Footer } from '@/components/layout/Footer';
import { ProjectGrid } from '@/components/archive/ProjectGrid';
import type { SanityProject } from '@/lib/tina';

interface ArchiveContentProps {
  projects: SanityProject[];
}

export function ArchiveContent({ projects }: ArchiveContentProps) {
  return (
    <>
      <Navbar />
      <Hero
        titleFirst="Selected"
        titleSecond="Works."
        description="A comprehensive index of commercial projects, experimental prototypes, and open source contributions."
        role="2021 — 2025"
        roleLabel="Archive"
        aboutLabel="Index"
        compact
      />
      <ProjectGrid projects={projects} />
      <Footer />
    </>
  );
}
