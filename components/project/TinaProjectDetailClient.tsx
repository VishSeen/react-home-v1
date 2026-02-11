'use client';

import { useTina } from "tinacms/dist/react";
import { ProjectDetail } from "@/components/project/ProjectDetail";
import { mapProject } from "@/lib/tina-helpers";

export function TinaProjectDetailClient({ rawProject, rawAllProjects }: { rawProject: any, rawAllProjects: any }) {
  const { data: projectData } = useTina({
    query: rawProject.query,
    variables: rawProject.variables,
    data: rawProject.data,
  });

  // We can also make the list editable if we want, or just read static
  // Usually for detail page the list is just for navigation
  const { data: allProjectsData } = useTina({
    query: rawAllProjects.query,
    variables: rawAllProjects.variables,
    data: rawAllProjects.data,
  });

  const project = mapProject(projectData.project);

  const allProjects = allProjectsData.projectConnection.edges
      ?.map((edge: any) => edge?.node)
      .filter((node: any) => node !== undefined && node !== null)
      .map(mapProject)
      .sort((a: any, b: any) => a.id.localeCompare(b.id))
      || [];

  return <ProjectDetail project={project} allProjects={allProjects} />;
}
