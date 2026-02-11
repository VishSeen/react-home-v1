// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      // ─── Global Settings ───────────────────────────────────────
      {
        name: "global",
        label: "Site Settings",
        path: "content/global",
        format: "json",
        ui: {
          global: true,
          router: () => "/",
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          // ── Identity ──
          {
            type: "string",
            name: "name",
            label: "Full Name",
            description: "Your full name displayed across the site."
          },
          {
            type: "string",
            name: "logoName",
            label: "Logo Text",
            description: "Short name or monogram shown in the navbar."
          },
          {
            type: "string",
            name: "role",
            label: "Job Title",
            description: 'e.g. "Full-Stack Developer"'
          },
          {
            type: "string",
            name: "location",
            label: "Location",
            description: 'e.g. "Mauritius"'
          },
          {
            type: "string",
            name: "email",
            label: "Email Address"
          },
          // ── Hero ──
          {
            type: "object",
            name: "hero",
            label: "\u{1F3E0} Hero Section",
            description: "The large landing area visitors see first.",
            fields: [
              {
                type: "string",
                name: "titleFirst",
                label: "Title \u2014 Line 1",
                description: "First line of the hero heading."
              },
              {
                type: "string",
                name: "titleSecond",
                label: "Title \u2014 Line 2",
                description: "Second line of the hero heading."
              },
              {
                type: "string",
                name: "description",
                label: "Subtitle",
                description: "A short tagline beneath the title.",
                ui: { component: "textarea" }
              },
              {
                type: "string",
                name: "currentCompany",
                label: "Current Company",
                description: "Shown as a badge in the hero."
              }
            ]
          },
          // ── About ──
          {
            type: "object",
            name: "about",
            label: "\u{1F4DD} About Section",
            description: "A brief introduction about you.",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Section Title"
              },
              {
                type: "string",
                name: "description",
                label: "Bio",
                description: "Supports multiple paragraphs.",
                ui: { component: "textarea" }
              }
            ]
          },
          // ── Experience ──
          {
            type: "object",
            name: "experience",
            label: "\u{1F4BC} Experience",
            description: "Your work history. Drag to reorder.",
            list: true,
            ui: {
              defaultItem: {
                role: "Job Title",
                company: "Company Name",
                period: "2024 \u2014 Present",
                description: ""
              },
              itemProps: (item) => ({
                label: item?.company ? `${item.role} @ ${item.company}` : "New Position"
              })
            },
            fields: [
              { type: "string", name: "role", label: "Role" },
              {
                type: "string",
                name: "period",
                label: "Period",
                description: 'e.g. "2022 \u2014 2024"'
              },
              { type: "string", name: "company", label: "Company" },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" }
              }
            ]
          },
          // ── Tech Stack ──
          {
            type: "object",
            name: "stack",
            label: "\u{1F6E0} Tech Stack",
            description: "Technologies grouped by category.",
            fields: [
              {
                type: "string",
                name: "core",
                label: "Core",
                description: "Primary languages & frameworks.",
                list: true
              },
              {
                type: "string",
                name: "creative",
                label: "Creative",
                description: "Design, animation & visual tools.",
                list: true
              },
              {
                type: "string",
                name: "infrastructure",
                label: "Infrastructure",
                description: "DevOps, cloud & CI/CD.",
                list: true
              }
            ]
          },
          // ── Services ──
          {
            type: "string",
            name: "services",
            label: "\u{1F3AF} Services",
            description: "What you offer. One item per line.",
            list: true
          },
          // ── Socials ──
          {
            type: "object",
            name: "socials",
            label: "\u{1F517} Social Links",
            description: "Add up to 4 links. Choose a display title and paste the URL.",
            list: true,
            ui: {
              max: 4,
              defaultItem: {
                title: "Link",
                url: "https://"
              },
              itemProps: (item) => ({
                label: item?.title || "Untitled Link"
              })
            },
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                description: 'Display name, e.g. "GitHub", "LinkedIn", "Dribbble".',
                required: true
              },
              {
                type: "string",
                name: "url",
                label: "URL",
                description: "Full link including https://.",
                required: true
              }
            ]
          }
        ]
      },
      // ─── Projects ──────────────────────────────────────────────
      {
        name: "project",
        label: "Projects",
        path: "content/projects",
        format: "md",
        ui: {
          router: ({ document }) => `/projects/${document._sys.filename}`,
          filename: {
            slugify: (values) => `${values?.slug || "new-project"}`
          },
          defaultItem: {
            displayId: "00",
            category: "Web App",
            year: (/* @__PURE__ */ new Date()).getFullYear().toString(),
            order: 0
          }
        },
        fields: [
          // ── Basics ──
          {
            type: "string",
            name: "title",
            label: "Project Title",
            description: "The name of the project.",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug",
            description: 'Used in the URL: /projects/[slug]. Use lowercase with hyphens, e.g. "my-project".',
            required: true
          },
          {
            type: "string",
            name: "displayId",
            label: "Display #",
            description: 'A short index number shown in the UI, e.g. "01", "02".'
          },
          {
            type: "number",
            name: "order",
            label: "Sort Order",
            description: "Lower numbers appear first. Projects on the homepage are sorted by this value."
          },
          // ── Metadata ──
          {
            type: "string",
            name: "category",
            label: "Category",
            description: 'e.g. "E-Commerce", "SaaS", "Dashboard".',
            options: [
              "Web App",
              "E-Commerce",
              "SaaS",
              "Dashboard",
              "Mobile",
              "Design System",
              "Open Source",
              "Other"
            ]
          },
          {
            type: "string",
            name: "year",
            label: "Year",
            description: "The year the project was completed."
          },
          {
            type: "string",
            name: "client",
            label: "Client",
            description: 'Company or person. Use "Personal" for side projects.'
          },
          // ── Descriptions ──
          {
            type: "string",
            name: "description",
            label: "Short Description",
            description: "One-liner shown on project cards (~120 chars).",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "longDescription",
            label: "Full Description",
            description: "Detailed overview shown on the project detail page.",
            ui: { component: "textarea" }
          },
          // ── Case Study ──
          {
            type: "string",
            name: "challenge",
            label: "Challenge",
            description: "What problem did the project solve?",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "solution",
            label: "Solution",
            description: "How you approached and resolved the challenge.",
            ui: { component: "textarea" }
          },
          // ── Media & Tech ──
          {
            type: "image",
            name: "image",
            label: "Cover Image",
            description: "Recommended 1600\xD7900. Upload or paste an external URL."
          },
          {
            type: "string",
            name: "tech",
            label: "Tech Stack",
            description: 'Add one technology per item, e.g. "Next.js".',
            list: true
          },
          // ── Body ──
          {
            type: "rich-text",
            name: "body",
            label: "Body Content",
            description: "Optional long-form content with rich formatting (Markdown).",
            isBody: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
