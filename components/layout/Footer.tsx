import { Reveal } from '@/components/ui/Reveal';
import { PORTFOLIO_DATA } from '@/lib/constants';

export function Footer() {
  return (
    <footer id="contact" className="py-24 px-6 md:px-12 bg-[#EAEAE5]">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <Reveal>
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-secondary mb-8 block">
            Next Steps
          </span>
        </Reveal>

        <Reveal delay={200}>
          <a
            href={`mailto:${PORTFOLIO_DATA.email}`}
            className="font-serif text-5xl md:text-8xl text-primary hover:text-secondary transition-colors duration-500 italic"
          >
            Let&apos;s create together.
          </a>
        </Reveal>

        <div className="mt-24 w-full flex flex-col md:flex-row justify-between items-center text-xs tracking-[0.15em] uppercase text-primary/60 border-t border-primary/5 pt-8">
          <div className="flex gap-8 mb-4 md:mb-0">
            <span>© 2025 {PORTFOLIO_DATA.name}</span>
          </div>

          <div className="flex gap-12">
            <a
              href={PORTFOLIO_DATA.socials.linkedin}
              className="hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={PORTFOLIO_DATA.socials.instagram}
              className="hover:text-primary transition-colors"
            >
              Instagram
            </a>
            <a
              href={PORTFOLIO_DATA.socials.github}
              className="hover:text-primary transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
