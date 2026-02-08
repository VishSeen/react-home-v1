import { PORTFOLIO_DATA } from '@/lib/constants';

interface ProjectCardProps {
  project: (typeof PORTFOLIO_DATA.projects)[0];
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="w-[85vw] md:w-[45vw] lg:w-[35vw] shrink-0 group cursor-pointer">
      <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-gray-200 mb-6 group-hover:shadow-2xl transition-all duration-500">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
      </div>

      <div className="flex justify-between items-start border-t border-primary/20 pt-4 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
        <div className="max-w-[70%]">
          <h3 className="text-2xl md:text-3xl font-serif text-primary mb-2 group-hover:translate-x-2 transition-transform duration-500">
            {project.title}
          </h3>
          <p className="text-xs md:text-sm text-secondary font-light leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>
        <span className="text-xs font-mono text-primary/40 pt-2">
          /{project.id}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
        {project.tech.slice(0, 3).map((t, i) => (
          <span
            key={i}
            className="text-[9px] uppercase tracking-widest border border-primary/20 px-2 py-1 rounded-full text-secondary"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
