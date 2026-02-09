'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { AboutSection } from '@/components/sections/AboutSection';
import { WorkCarousel } from '@/components/sections/WorkCarousel';
import { Footer } from '@/components/layout/Footer';
import { Preloader } from '@/components/ui/Preloader';
import type { SanitySiteSettings, SanityProject } from '@/lib/sanity';

interface HomeContentProps {
  settings: SanitySiteSettings;
  projects: SanityProject[];
}

export function HomeContent({ settings, projects }: HomeContentProps) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <Navbar settings={settings} />
      <main>
        <Hero loading={loading} settings={settings} />
        <AboutSection settings={settings} />
        <WorkCarousel projects={projects} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
