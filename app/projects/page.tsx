import type { Metadata } from "next";
import { ArchiveContent } from "@/components/archive/ArchiveContent";
import { getProjects } from "@/lib/tina";

export const metadata: Metadata = {
  title: "Selected Works | Vishroy Seenarain",
  description:
    "A comprehensive index of commercial projects, experimental prototypes, and open source contributions.",
};

export default async function ArchivePage() {
  const projects = await getProjects();

  return <ArchiveContent projects={projects} />;
}
