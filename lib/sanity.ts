// All Sanity code removed. Use TinaCMS or static data only.

import { client } from "../tina/__generated__/client";
import { PORTFOLIO_DATA } from "./constants";

// ---------- Types ----------

export interface Project {
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
  tech: string[];
}

export interface SiteSettings {
  name: string;
  logoName: string;
  role: string;
  location: string;
  email: string;
  phone?: string;
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
  socials?: {
    title: string;
    url: string;
  }[];
}

// ---------- TinaCMS Data Access ----------

// Example TinaCMS data access (replace with Tina hooks/queries as needed)
export async function getProjects(): Promise<Project[]> {
  // TODO: Replace with TinaCMS query if available
  return PORTFOLIO_DATA.projects;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  // TODO: Replace with TinaCMS query if available
  return PORTFOLIO_DATA.projects.find((p) => p.slug === slug) ?? null;
}

export async function getProjectSlugs(): Promise<string[]> {
  // TODO: Replace with TinaCMS query if available
  return PORTFOLIO_DATA.projects.map((p) => p.slug);
}

  // This file is deprecated. Use lib/tina.ts for all CMS operations.
  try {
