import { defineType, defineField } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "longDescription",
      title: "Long Description",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "challenge",
      title: "Challenge",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "solution",
      title: "Solution",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "image",
      title: "Image URL",
      type: "url",
      description: "External image URL (e.g., picsum.photos, unsplash)",
    }),
    defineField({
      name: "sanityImage",
      title: "Uploaded Image",
      type: "image",
      options: { hotspot: true },
      description: "Upload an image directly (overrides Image URL)",
    }),
    defineField({
      name: "tech",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "sanityImage",
    },
  },
});
