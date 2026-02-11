'use client';

import { useTina } from "tinacms/dist/react";
import { ArchiveContent } from "@/components/archive/ArchiveContent";
import { mapProject } from "@/lib/tina-helpers";

export function TinaProjectsClient({ rawProjects }: { rawProjects: any }) {
  const { data: projectsData } = useTina({
    query: rawProjects.query,
    variables: rawProjects.variables,
    data: rawProjects.data,
  });

  const projects = projectsData.projectConnection.edges
      ?.map((edge: any) => edge?.node)
      .filter((node: any) => node !== undefined && node !== null)
      .map(mapProject)
      .sort((a: any, b: any) => a.id.localeCompare(b.id))
      || [];

  return <ArchiveContent projects={projects} />;
}
