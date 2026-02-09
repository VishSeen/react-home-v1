import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Title",
      type: "string",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "experience",
      title: "Experience",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "period", title: "Period", type: "string" }),
            defineField({ name: "role", title: "Role", type: "string" }),
            defineField({ name: "company", title: "Company", type: "string" }),
          ],
          preview: {
            select: {
              title: "role",
              subtitle: "company",
            },
          },
        },
      ],
    }),
    defineField({
      name: "stack",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "services",
      title: "Services / Capabilities",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "socials",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({ name: "github", title: "GitHub URL", type: "url" }),
        defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
        defineField({ name: "twitter", title: "Twitter URL", type: "url" }),
        defineField({ name: "dribbble", title: "Dribbble URL", type: "url" }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "profileImage",
    },
  },
});
