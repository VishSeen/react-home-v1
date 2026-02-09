import { HomeContent } from "@/components/home/HomeContent";
import { getProjects, getSiteSettings } from "@/lib/sanity";

export default async function HomePage() {
  const [settings, projects] = await Promise.all([
    getSiteSettings(),
    getProjects(),
  ]);

  return <HomeContent settings={settings} projects={projects} />;
}
