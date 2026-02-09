import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { PORTFOLIO_DATA } from "./constants";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

let client: SanityClient | null = null;

function getClient(): SanityClient | null {
  if (!projectId) return null;
  if (!client) {
    client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    });
  }
  return client;
}

export function urlFor(source: any) {
  const c = getClient();
  if (!c) return null;
  return imageUrlBuilder(c).image(source);
}

// ---------- Types ----------

export interface SanityProject {
  id: string;
  title: string;
  slug: string;
  category: string;
  year: string;
  client: string;
  description: string;
  longDescription: string;
  challenge: string;
  solution: string;
  image: string; // resolved URL
  sanityImage?: any; // raw Sanity image ref for urlFor()
  tech: string[];
}

export interface SanitySiteSettings {
  name: string;
  logoName: string;
  role: string;
  location: string;
  email: string;
  hero: {
    titleFirst: string;
    titleSecond: string;
    description: string;
    currentCompany: string;
  };
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
    linkedin: string;
    github: string;
    instagram: string;
  };
}

// ---------- Queries ----------

const PROJECT_FIELDS = `
  id,
  title,
  "slug": slug.current,
  category,
  year,
  client,
  description,
  longDescription,
  challenge,
  solution,
  "image": image.asset->url,
  "sanityImage": image,
  tech,
  order
`;

export async function getProjects(): Promise<SanityProject[]> {
  const c = getClient();
  if (!c) return PORTFOLIO_DATA.projects;

  try {
    const projects = await c.fetch<SanityProject[]>(
      `*[_type == "project"] | order(order asc) { ${PROJECT_FIELDS} }`,
    );
    return projects.length > 0 ? projects : PORTFOLIO_DATA.projects;
  } catch {
    return PORTFOLIO_DATA.projects;
  }
}

export async function getProjectBySlug(
  slug: string,
): Promise<SanityProject | null> {
  const c = getClient();
  if (!c) {
    return PORTFOLIO_DATA.projects.find((p) => p.slug === slug) ?? null;
  }

  try {
    const project = await c.fetch<SanityProject | null>(
      `*[_type == "project" && slug.current == $slug][0] { ${PROJECT_FIELDS} }`,
      { slug },
    );
    if (project) return project;
    return PORTFOLIO_DATA.projects.find((p) => p.slug === slug) ?? null;
  } catch {
    return PORTFOLIO_DATA.projects.find((p) => p.slug === slug) ?? null;
  }
}

export async function getProjectSlugs(): Promise<string[]> {
  const c = getClient();
  if (!c) return PORTFOLIO_DATA.projects.map((p) => p.slug);

  try {
    const slugs = await c.fetch<string[]>(
      `*[_type == "project"] | order(order asc) { "slug": slug.current }.slug`,
    );
    return slugs.length > 0
      ? slugs
      : PORTFOLIO_DATA.projects.map((p) => p.slug);
  } catch {
    return PORTFOLIO_DATA.projects.map((p) => p.slug);
  }
}

export async function getSiteSettings(): Promise<SanitySiteSettings> {
  const c = getClient();
  if (!c) return PORTFOLIO_DATA;

  try {
    const settings = await c.fetch<SanitySiteSettings | null>(
      `*[_type == "siteSettings"][0] {
        name,
        logoName,
        role,
        location,
        email,
        hero,
        about,
        experience,
        stack,
        services,
        socials
      }`,
    );
    return settings ?? PORTFOLIO_DATA;
  } catch {
    return PORTFOLIO_DATA;
  }
}
