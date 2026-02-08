import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { AboutSection } from '@/components/sections/AboutSection';
import { Footer } from '@/components/layout/Footer';

export function ProfileContent() {
  return (
    <>
      <Navbar />
      <Hero
        titleFirst="About"
        titleSecond="Me."
        description="The rigor of computer science meets the nuance of interaction design."
        role={`Senior Software Engineer`}
        roleLabel="Profile"
        aboutLabel="Philosophy"
        compact
      />
      <AboutSection />
      <Footer />
    </>
  );
}
