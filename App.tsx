import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WorkCarousel } from './components/BentoGrid';
import { AboutSection } from './components/About';
import { Footer } from './components/Footer';
import { AIChat } from './components/AIChat';
import { Preloader } from './components/Preloader';
import { LandingPage } from './components/LandingPage';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="bg-background min-h-screen text-primary selection:bg-primary/10 selection:text-primary">
      {isHome && loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Navbar is handled inside pages or globally?
          Original App had Navbar globally. LandingPage has its own Navbar.
          To avoid double navbar if LandingPage has one, we should condition it or remove it from sub-pages if they include it.
          LandingPage.tsx INCLUDES Navbar.
          App.tsx INCLUDES Navbar.

          I will remove Navbar from here and let pages handle it, OR keep it here and remove from pages.
          Given LandingPage seems to be a standalone full page component, I'll use Routes to switch between Home content and LandingPage.
      */}

      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <main>
              <Hero loading={loading} />
              <AboutSection />
              <WorkCarousel />
            </main>
            <Footer />
          </>
        } />
        <Route path="/archive" element={<LandingPage />} />
      </Routes>

      {/* <AIChat /> */}
    </div>
  );
};

export default App;