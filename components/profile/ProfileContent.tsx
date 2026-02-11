import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { AboutSection } from '@/components/sections/AboutSection';
import { Footer } from '@/components/layout/Footer';
import type { SanitySiteSettings } from '@/lib/tina';

interface ProfileContentProps {
  settings: SanitySiteSettings;
}

export function ProfileContent({ settings }: ProfileContentProps) {
  return (
    <>
      <Navbar settings={settings} />
      <Hero
        titleFirst="About"
        titleSecond="Me."
        description="The rigor of computer science meets the nuance of interaction design."
        role={settings.role}
        roleLabel="Profile"
        aboutLabel="Philosophy"
        compact
        settings={settings}
      />
      <AboutSection settings={settings} />
      <Footer settings={settings} />
    </>
  );
}
