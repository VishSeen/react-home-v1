'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { AboutSection } from '@/components/sections/AboutSection';
import { WorkCarousel } from '@/components/sections/WorkCarousel';
import { Footer } from '@/components/layout/Footer';
import { Preloader } from '@/components/ui/Preloader';

export function HomeContent() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <Navbar />
      <main>
        <Hero loading={loading} />
        <AboutSection />
        <WorkCarousel />
      </main>
      <Footer />
    </>
  );
}
