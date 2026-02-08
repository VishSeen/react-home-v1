export const PORTFOLIO_DATA = {
  name: "Vishroy Seenarain",
  logoName: "Vishroy",
  role: "Senior Software Engineer",
  location: "Grand Gaube, MU",
  email: "vishseenarain@gmail.com",
  hero: {
    titleFirst: "Vishroy",
    titleSecond: "Seenarain.",
    description:
      "I architect high-performance digital experiences that merge technical precision with editorial aesthetics.",
    currentCompany: "TechFlow",
  },
  about: {
    title: "Bridging Logic & Emotion",
    description:
      "I am Vishroy Seenarain. I don't just write code; I orchestrate experiences. With over 8 years in the field, my approach combines the rigor of computer science with the nuance of interaction design. I build scalable, high-performance applications that feel human.",
  },
  experience: [
    {
      role: "Senior Software Engineer",
      period: "2021 — Present",
      company: "TechFlow Systems, SF",
      description:
        "Leading a team of 6 engineers to re-architect the core SaaS dashboard. Reduced load times by 40% using React Server Components and optimized WebGL data layers.",
    },
    {
      role: "Creative Developer",
      period: "2018 — 2021",
      company: "Studio Morte",
      description:
        "Developed award-winning experiential websites for luxury fashion brands. Specialized in GSAP animations and Three.js integrations.",
    },
    {
      role: "Full Stack Developer",
      period: "2016 — 2018",
      company: "Freelance",
      description:
        "Delivered bespoke e-commerce solutions and custom CMS integrations for startups in the Bay Area.",
    },
  ],
  stack: {
    core: ["React / Next.js", "TypeScript", "Node.js", "GraphQL"],
    creative: [
      "WebGL / Three.js",
      "GSAP / Framer Motion",
      "D3.js",
      "Tailwind CSS",
    ],
    infrastructure: ["Google Gemini API", "AWS / Vercel", "Python"],
  },
  services: [
    "Frontend Architecture",
    "UI/UX Design",
    "Performance Optimization",
    "Design Systems",
    "Creative Direction",
  ],
  projects: [
    {
      id: "01",
      slug: "nebula-dashboard",
      title: "Nebula Dashboard",
      category: "SaaS Platform",
      year: "2024",
      client: "TechFlow Systems",
      description:
        "Real-time analytics engine processing 1M+ events/sec via WebSockets.",
      longDescription:
        "Nebula Dashboard is a real-time analytics platform built for enterprise-scale data monitoring. The system ingests over one million events per second through a WebSocket pipeline, rendering complex data visualizations with sub-50ms latency. The interface features interactive D3.js charts, customizable widget layouts, and a dark-mode-first design system that reduces cognitive load during extended monitoring sessions.",
      challenge:
        "The primary challenge was maintaining 60fps rendering performance while streaming high-frequency data updates. Traditional React re-render patterns caused frame drops at scale, requiring a hybrid approach combining React for layout with imperative D3.js mutations for real-time chart updates.",
      solution:
        "We implemented a web worker pipeline to offload data aggregation from the main thread, combined with requestAnimationFrame batching for DOM updates. The dashboard uses virtualized scrolling for historical data tables and canvas-based rendering for high-density scatter plots, achieving consistent sub-16ms frame times.",
      image: "https://picsum.photos/1600/900?random=1",
      tech: ["React", "D3.js", "Node.js", "WebSockets", "Redis"],
    },
    {
      id: "02",
      slug: "aura-commerce",
      title: "Aura Commerce",
      category: "E-Commerce",
      year: "2023",
      client: "Aura Fashion Group",
      description:
        "Headless Shopify storefront with WebGL product configurators.",
      longDescription:
        "Aura Commerce is a headless e-commerce experience for a luxury fashion house, replacing their monolithic Shopify theme with a bespoke Next.js storefront. The centrepiece is a WebGL product configurator that lets customers rotate, zoom, and customise garments in real-time with photorealistic material rendering.",
      challenge:
        "Luxury e-commerce demands impeccable visual fidelity without sacrificing page speed. The original Shopify storefront scored 28 on Lighthouse performance, with 8-second load times driving a 60% bounce rate on mobile.",
      solution:
        "The headless architecture decoupled the frontend from Shopify's rendering layer, enabling edge caching via Vercel and ISR for product pages. The WebGL configurator uses compressed glTF models with progressive loading, starting with a 50KB preview mesh and streaming high-detail geometry on interaction. Final Lighthouse score: 94.",
      image: "https://picsum.photos/1600/900?random=2",
      tech: ["Next.js", "WebGL", "Shopify", "Three.js", "Vercel"],
    },
    {
      id: "03",
      slug: "zenith-ai",
      title: "Zenith AI",
      category: "Generative Tool",
      year: "2024",
      client: "Internal R&D",
      description:
        "AI-powered workflow automation interface using Gemini 1.5 Pro.",
      longDescription:
        "Zenith AI is an internal tool that brings generative AI into the software development workflow. It connects to Gemini 1.5 Pro's multimodal capabilities to automate code review, generate documentation, and create test suites from natural language descriptions. The interface features a conversational UI with real-time streaming responses and inline code diff previews.",
      challenge:
        "Integrating LLM outputs into developer tooling requires handling unpredictable response formats, managing streaming token rendering without layout shifts, and providing meaningful fallbacks when the model produces incorrect code suggestions.",
      solution:
        "We built a custom streaming renderer that parses markdown and code blocks incrementally, with syntax highlighting applied as tokens arrive. A validation layer runs generated code through AST parsing before presenting it to the user, flagging potential issues inline. The tool reduced documentation time by 70% across the engineering team.",
      image: "https://picsum.photos/1600/900?random=3",
      tech: ["Gemini API", "Python", "React", "FastAPI", "Monaco Editor"],
    },
    {
      id: "04",
      slug: "mono-systems",
      title: "Mono Systems",
      category: "Design System",
      year: "2023",
      client: "Enterprise Internal",
      description:
        "Enterprise component library used by 40+ engineering teams.",
      longDescription:
        "Mono Systems is a comprehensive design system serving as the single source of truth for UI components across a 200-person engineering organisation. It includes 120+ accessible components, design tokens, and an automated visual regression testing pipeline. The system enforces WCAG 2.1 AA compliance by default and supports theming for white-label product variants.",
      challenge:
        "Scaling a design system across 40+ teams with varying tech stacks (React, Vue, web components) while maintaining visual consistency and accessibility compliance was the core challenge. Previous attempts at shared libraries had fragmented into team-specific forks.",
      solution:
        "We adopted a framework-agnostic token layer with platform-specific component implementations auto-generated from a shared schema. Storybook serves as the interactive documentation hub, with Chromatic providing visual regression testing on every PR. Adoption went from 30% to 95% within six months of launch.",
      image: "https://picsum.photos/1600/900?random=4",
      tech: ["TypeScript", "Storybook", "A11y", "Chromatic", "Web Components"],
    },
  ],
  socials: {
    linkedin: "https://www.linkedin.com/in/seenarain-vishroy-110507123/",
    github: "https://github.com/VishSeen",
    instagram: "https://www.instagram.com/vishroy_codes/",
  },
};
