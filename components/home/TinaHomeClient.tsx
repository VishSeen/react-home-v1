'use client';

import { useTina } from "tinacms/dist/react";
import { HomeContent } from "@/components/home/HomeContent";
import { mapSiteSettings, mapProject } from "@/lib/tina-helpers";

export function TinaHomeClient({ rawSettings, rawProjects }: { rawSettings: any, rawProjects: any }) {
  // Use useTina hook to make the data editable
  const { data: settingsData } = useTina({
    query: rawSettings.query,
    variables: rawSettings.variables,
    data: rawSettings.data,
  });

  const { data: projectsData } = useTina({
    query: rawProjects.query,
    variables: rawProjects.variables,
    data: rawProjects.data,
  });

  // Transform data back to the format the UI expects
  const settings = mapSiteSettings(settingsData.global);

  const allProjects = projectsData.projectConnection.edges
      ?.map((edge: any) => edge?.node)
      .filter((node: any) => node !== undefined && node !== null)
      .map(mapProject)
      .sort((a: any, b: any) => a.id.localeCompare(b.id))
      || [];

  // Only show the 3 most recent projects on the homepage
  const projects = allProjects.slice(0, 3);

  return <HomeContent settings={settings} projects={projects} />;
}
