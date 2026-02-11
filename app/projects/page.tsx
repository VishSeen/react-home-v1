import type { Metadata } from "next";
import { TinaProjectsClient } from "@/components/archive/TinaProjectsClient";
import { getProjectsResponse } from "@/lib/tina";

export const metadata: Metadata = {
  title: "Selected Works | Vishroy Seenarain",
  description:
    "A comprehensive index of commercial projects, experimental prototypes, and open source contributions.",
};

export default async function ArchivePage() {
  const rawProjects = await getProjectsResponse();

  return <TinaProjectsClient rawProjects={rawProjects} />;
}
