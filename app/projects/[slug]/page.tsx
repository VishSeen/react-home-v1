import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ProjectDetail } from "@/components/project/ProjectDetail";
import {
  getProjects,
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
  const [project, allProjects] = await Promise.all([
    getProjectBySlug(slug),
    getProjects(),
  ]);

  if (!project) notFound();

  return <ProjectDetail project={project} allProjects={allProjects} />;
}
