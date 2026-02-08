import { PORTFOLIO_DATA } from '@/lib/constants';
import { ProjectItem } from '@/components/ui/ProjectItem';

export function ProjectGrid() {
  const allProjects = [
    ...PORTFOLIO_DATA.projects,
    ...PORTFOLIO_DATA.projects,
  ];

  return (
    <section className="px-6 md:px-12 py-32 bg-background relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {allProjects.map((project, idx) => (
            <ProjectItem
              key={`${project.id}-${idx}`}
              project={project}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
