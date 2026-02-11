import { Reveal } from '@/components/ui/Reveal';
import { PORTFOLIO_DATA } from '@/lib/constants';
import { Fragment } from 'react';
import type { SanitySiteSettings } from '@/lib/tina';

interface AboutSectionProps {
  settings?: SanitySiteSettings;
}

export function AboutSection({ settings }: AboutSectionProps) {
  const data = settings ?? PORTFOLIO_DATA;
  return (
    <section id="about" className="py-32 px-6 md:px-12 bg-[#EAEAE5] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 mb-24">
          <div className="md:col-span-4">
            <Reveal>
              <span className="text-xs font-medium tracking-[0.3em] uppercase text-secondary">
                The Engineer
              </span>
            </Reveal>
            <Reveal delay={200}>
              <h2
                className="text-5xl md:text-7xl font-serif text-primary mt-6 leading-[1.1]"
                dangerouslySetInnerHTML={{
                  __html:
                    data.about.title.replace(
                      '&',
                      '&<br/><span class="italic text-secondary">'
                    ) + '</span>',
                }}
              />
            </Reveal>
          </div>
          <div className="md:col-span-8 flex items-end">
            <Reveal delay={400}>
              <p className="text-lg md:text-xl font-light leading-relaxed text-primary/80 max-w-2xl">
                {data.about.description}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="w-full h-[1px] bg-primary/10 mb-24" />

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          {/* Experience Timeline */}
          <div>
            <Reveal>
              <h3 className="text-xl font-serif italic mb-12 text-primary">
                Experience
              </h3>
            </Reveal>
            <div className="space-y-12">
              {data.experience.map((exp, idx) => (
                <Fragment key={idx}>
                  <Reveal delay={200 + idx * 200}>
                    <div className="group">
                      <div className="flex justify-between items-baseline mb-2">
                        <h4 className="text-2xl font-serif text-primary">
                          {exp.role}
                        </h4>
                        <span className="font-mono text-xs text-secondary">
                          {exp.period}
                        </span>
                      </div>
                      <div className="text-sm font-medium tracking-widest uppercase text-accent mb-4">
                        {exp.company}
                      </div>
                      <p className="text-secondary font-light leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </Reveal>
                </Fragment>
              ))}
            </div>
          </div>

          {/* Stack & Approach */}
          <div className="flex flex-col gap-16">
            {/* Tech Stack */}
            <Reveal delay={300}>
              <div>
                <h3 className="text-xl font-serif italic mb-8 text-primary">
                  Technical Stack
                </h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <div className="space-y-2">
                    <span className="block text-xs uppercase tracking-widest text-primary/40 border-b border-primary/5 pb-2 mb-2">
                      Core
                    </span>
                    {data.stack.core.map((item, i) => (
                      <div key={i} className="text-primary font-light">
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <span className="block text-xs uppercase tracking-widest text-primary/40 border-b border-primary/5 pb-2 mb-2">
                      Creative
                    </span>
                    {data.stack.creative.map((item, i) => (
                      <div key={i} className="text-primary font-light">
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <span className="block text-xs uppercase tracking-widest text-primary/40 border-b border-primary/5 pb-2 mb-2">
                      AI & Cloud
                    </span>
                    {data.stack.infrastructure.map((item, i) => (
                      <div key={i} className="text-primary font-light">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Services */}
            <Reveal delay={500}>
              <div>
                <h3 className="text-xl font-serif italic mb-8 text-primary">
                  Capabilities
                </h3>
                <div className="flex flex-wrap gap-3">
                  {data.services.map((s) => (
                    <span
                      key={s}
                      className="px-4 py-2 border border-primary/10 rounded-full text-sm font-light text-secondary hover:bg-white hover:border-transparent transition-all cursor-default"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
