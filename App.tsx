import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WorkCarousel } from './components/BentoGrid';
import { AboutSection } from './components/About';
import { Footer } from './components/Footer';
import { AIChat } from './components/AIChat';
import { Preloader } from './components/Preloader';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="bg-background min-h-screen text-primary selection:bg-primary/10 selection:text-primary">
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <Navbar />

      <main>
        <Hero loading={loading} />
        <AboutSection />
        <WorkCarousel />
      </main>

      <Footer />
      {/* <AIChat /> */}
    </div>
  );
};

export default App;