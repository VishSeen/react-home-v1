import { ProjectItem } from '@/components/ui/ProjectItem';
import type { SanityProject } from '@/lib/tina';

interface ProjectGridProps {
  projects: SanityProject[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <section className="px-6 md:px-12 py-32 bg-background relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {projects.map((project, idx) => (
            <ProjectItem
              key={project.slug || project.id}
              project={project}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
