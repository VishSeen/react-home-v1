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
      title: string;
      url: string;
    }[];
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
      logoName: data.logoName || '',
      role: data.role || '',
      location: data.location || '',
      email: data.email || '',
      hero: {
        titleFirst: data.hero?.titleFirst || '',
        titleSecond: data.hero?.titleSecond || '',
        description: data.hero?.description || '',
        currentCompany: data.hero?.currentCompany || '',
      },
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
      socials: (data.socials || []).map((s: any) => ({
        title: s?.title || '',
        url: s?.url || '',
      })),
    };
  };
