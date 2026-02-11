import { notFound } from "next/navigation";
import { Metadata } from "next";
import { TinaProjectDetailClient } from "@/components/project/TinaProjectDetailClient";
import {
  getProjectsResponse,
  getProjectResponse,
  getProjectBySlug,
  getProjectSlugs,
  getSiteSettings,
} from "@/lib/tina";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [project, settings] = await Promise.all([
    getProjectBySlug(slug),
    getSiteSettings(),
  ]);

  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — ${settings.name}`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  // Note: Validation if project exists should happen before fetch if possible or handle catch
  try {
    const [rawProject, rawAllProjects] = await Promise.all([
      getProjectResponse(slug),
      getProjectsResponse(),
    ]);

    return <TinaProjectDetailClient rawProject={rawProject} rawAllProjects={rawAllProjects} />;
  } catch (error) {
    return notFound();
  }
}
