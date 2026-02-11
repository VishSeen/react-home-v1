import { TinaHomeClient } from "@/components/home/TinaHomeClient";
import { getSiteSettingsResponse, getProjectsResponse } from "@/lib/tina";

export default async function HomePage() {
  const [rawSettings, rawProjects] = await Promise.all([
    getSiteSettingsResponse(),
    getProjectsResponse(),
  ]);

  return <TinaHomeClient rawSettings={rawSettings} rawProjects={rawProjects} />;
}
