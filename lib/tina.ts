import { createClient } from "tinacms/dist/client";
import { queries } from "../tina/__generated__/types";

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

// Use local GraphQL server in development, or Tina Cloud in production
const apiURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4001/graphql"
    : `https://content.tinajs.io/1.4/content/${process.env.NEXT_PUBLIC_TINA_CLIENT_ID}/github/${branch}`;

export const client = createClient({
  url: apiURL,
  token: process.env.TINA_TOKEN,
  queries,
});

// Define Types matching the application usage
export interface SanityProject {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  client: string;
  description: string;
  longDescription: string;
  challenge: string;
  solution: string;
  image: string;
  tech: string[];
}

export interface SanitySiteSettings {
  name: string;
  role: string;
  about: {
    title: string;
    description: string;
  };
  experience: {
    role: string;
    period: string;
    company: string;
    description: string;
  }[];
  stack: {
    core: string[];
    creative: string[];
    infrastructure: string[];
  };
  services: string[];
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    dribbble?: string;
  };
}

// Helper to map Tina project response to SanityProject interface
export const mapProject = (project: any): SanityProject => {
  if (!project) return {} as SanityProject;
  return {
    id: project.displayId || '',
    slug: project.slug,
    title: project.title,
    category: project.category || '',
    year: project.year || '',
    client: project.client || '',
    description: project.description || '',
    longDescription: project.longDescription || '',
    challenge: project.challenge || '',
    solution: project.solution || '',
    image: project.image || '',
    tech: project.tech || [],
  };
};

export const mapSiteSettings = (data: any): SanitySiteSettings => {
  if (!data) return {} as SanitySiteSettings;
  return {
    name: data.name || '',
    role: data.role || '',
    about: {
      title: data.about?.title || '',
      description: data.about?.description || '',
    },
    experience: (data.experience || []).map((exp: any) => ({
      role: exp?.role || '',
      period: exp?.period || '',
      company: exp?.company || '',
      description: exp?.description || '',
    })),
    stack: {
      core: (data.stack?.core as string[]) || [],
      creative: (data.stack?.creative as string[]) || [],
      infrastructure: (data.stack?.infrastructure as string[]) || [],
    },
    services: (data.services as string[]) || [],
    socials: {
      github: data.socials?.github || '',
      linkedin: data.socials?.linkedin || '',
      twitter: data.socials?.twitter || '',
      dribbble: data.socials?.dribbble || '',
    },
  };
};

// --- Raw Data Fetchers for Visual Editing ---

export const getSiteSettingsResponse = async () => {
    return client.queries.global({ relativePath: 'index.json' });
};

export const getProjectsResponse = async () => {
    // For visual editing of a list, we just return the connection query
    return client.queries.projectConnection();
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
    const res = await client.queries.projectConnection();
    return res.data.projectConnection.edges
      ?.map((edge) => edge?.node?.slug)
      .filter((slug): slug is string => !!slug) || [];
  } catch (error) {
    console.error('Error fetching project slugs:', error);
    return [];
  }
};
