import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "global",
        label: "Global Settings",
        path: "content/global",
        format: "json",
        ui: {
          global: true,
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "name",
            label: "Site Name",
          },
          {
            type: "string",
            name: "logoName",
            label: "Logo Name",
          },
          {
            type: "string",
            name: "role",
            label: "Role",
          },
          {
            type: "string",
            name: "location",
            label: "Location",
          },
          {
            type: "string",
            name: "email",
            label: "Email",
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              { type: "string", name: "titleFirst" },
              { type: "string", name: "titleSecond" },
              { type: "string", name: "description" },
              { type: "string", name: "currentCompany" },
            ],
          },
          {
            type: "object",
            name: "about",
            label: "About Section",
            fields: [
              { type: "string", name: "title" },
              { type: "string", name: "description", ui: { component: "textarea" } },
            ],
          },
          {
            type: "object",
            name: "experience",
            label: "Experience",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.company };
              },
            },
            fields: [
              { type: "string", name: "role" },
              { type: "string", name: "period" },
              { type: "string", name: "company" },
              { type: "string", name: "description", ui: { component: "textarea" } },
            ],
          },
          {
            type: "object",
            name: "stack",
            label: "Tech Stack",
            fields: [
              { type: "string", name: "core", list: true },
              { type: "string", name: "creative", list: true },
              { type: "string", name: "infrastructure", list: true },
            ],
          },
          {
            type: "string",
            name: "services",
            label: "Services",
            list: true,
          },
          {
            type: "object",
            name: "socials",
            label: "Social Links",
            fields: [
              { type: "string", name: "github" },
              { type: "string", name: "linkedin" },
              { type: "string", name: "twitter" },
              { type: "string", name: "dribbble" },
            ],
          },
        ],
      },
      {
        name: "project",
        label: "Projects",
        path: "content/projects",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => {
              return `${values?.slug || "new-project"}`;
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug",
            required: true,
          },
          {
            type: "string",
            name: "displayId",
            label: "Display ID (e.g. 01)",
          },
          {
            type: "string",
            name: "category",
            label: "Category",
          },
          {
            type: "string",
            name: "year",
            label: "Year",
          },
          {
            type: "string",
            name: "client",
            label: "Client",
          },
          {
            type: "string",
            name: "description",
            label: "Short Description",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "longDescription",
            label: "Long Description",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "challenge",
            label: "Challenge",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "solution",
            label: "Solution",
            ui: { component: "textarea" },
          },
          {
            type: "image",
            name: "image",
            label: "Cover Image",
          },
          {
            type: "string",
            name: "tech",
            label: "Tech Stack",
            list: true,
          },
          {
            type: "number",
            name: "order",
            label: "Order",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
