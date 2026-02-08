import { notFound } from "next/navigation";
import { Metadata } from "next";
import { PORTFOLIO_DATA } from "@/lib/constants";
import { ProjectDetail } from "@/components/project/ProjectDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PORTFOLIO_DATA.projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PORTFOLIO_DATA.projects.find((p) => p.slug === slug);

  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — ${PORTFOLIO_DATA.name}`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = PORTFOLIO_DATA.projects.find((p) => p.slug === slug);

  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
