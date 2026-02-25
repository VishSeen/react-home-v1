import { createClient } from "tinacms/dist/client";
import { queries } from "../tina/__generated__/types";
import { mapProject, mapSiteSettings, SanityProject, SanitySiteSettings } from "./tina-helpers";

// Re-export types/helpers so old imports (if any remaining) don't break immediately
// though we prefer importing from tina-helpers for pure functions
export * from "./tina-helpers";

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

// Use local GraphQL server in development/build, or Tina Cloud in production
const apiURL =
  process.env.NODE_ENV === "development" || process.env.BUILD_TINA === "true"
    ? "http://localhost:4001/graphql"
    : `https://content.tinajs.io/1.4/content/${process.env.NEXT_PUBLIC_TINA_CLIENT_ID}/github/${branch}`;

export const client = createClient({
  url: apiURL,
  token: process.env.TINA_TOKEN,
  queries,
});

// --- Raw Data Fetchers for Visual Editing ---

export const getSiteSettingsResponse = async () => {
    return client.queries.global({ relativePath: 'index.json' });
};

export const getProjectsResponse = async () => {
    // Fetch all projects (override default pagination limit)
    return client.queries.projectConnection({ first: 100 });
};

export const getProjectResponse = async (slug: string) => {
    return client.queries.project({ relativePath: `${slug}.md` });
};

// --- Parsed Data Fetchers for Production/Default ---

export const getSiteSettings = async (): Promise<SanitySiteSettings> => {
  try {
    const res = await getSiteSettingsResponse();
    return mapSiteSettings(res.data.global);
  } catch (error) {
    console.error('Error fetching site settings from Tina:', error);
    throw error;
  }
};

export const getProjects = async (): Promise<SanityProject[]> => {
  try {
    const res = await getProjectsResponse();
    const projects = res.data.projectConnection.edges
      ?.map((edge) => edge?.node)
      .filter((node) => node !== undefined && node !== null)
      .map(mapProject) || [];

    return projects.sort((a, b) => a.id.localeCompare(b.id));
  } catch (error) {
    console.error('Error fetching projects from Tina:', error);
    return [];
  }
};

export const getProjectBySlug = async (slug: string): Promise<SanityProject | null> => {
  try {
    const res = await getProjectResponse(slug);
    return mapProject(res.data.project);
  } catch (error) {
     // Fallback to iterating if strict relative path fails (handle slug mismatch)
     try {
         const all = await getProjects();
         return all.find((p) => p.slug === slug) || null;
     } catch (e) {
         console.error(`Error fetching project with slug ${slug}:`, e);
         return null;
     }
  }
};

export const getProjectSlugs = async (): Promise<string[]> => {
  try {
    const res = await client.queries.projectConnection({ first: 100 });
    return res.data.projectConnection.edges
      ?.map((edge) => edge?.node?.slug)
      .filter((slug): slug is string => !!slug) || [];
  } catch (error) {
    console.error('Error fetching project slugs:', error);
    return [];
  }
};
