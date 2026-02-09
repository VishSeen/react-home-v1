/**
 * Seed script — imports PORTFOLIO_DATA into your Sanity project.
 *
 * Usage:
 *   1. Set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local
 *   2. Set SANITY_AUTH_TOKEN in .env.local (create at sanity.io/manage → API → Tokens)
 *   3. Run: npx tsx scripts/seed-sanity.ts
 *
 * This will create all project documents and a siteSettings singleton.
 */

import { config } from "dotenv";
config({ path: ".env.local" });

import { createClient } from "@sanity/client";
import { PORTFOLIO_DATA } from "../lib/constants";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_AUTH_TOKEN;

if (!projectId || !token) {
  console.error(
    "❌ Missing env vars. Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_AUTH_TOKEN in .env.local",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function seed() {
  console.log("🌱 Seeding Sanity...\n");

  // --- Site Settings ---
  console.log("📝 Creating site settings...");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    name: PORTFOLIO_DATA.name,
    logoName: PORTFOLIO_DATA.logoName,
    role: PORTFOLIO_DATA.role,
    location: PORTFOLIO_DATA.location,
    email: PORTFOLIO_DATA.email,
    hero: PORTFOLIO_DATA.hero,
    about: PORTFOLIO_DATA.about,
    experience: PORTFOLIO_DATA.experience.map((exp) => ({
      _type: "object",
      _key: exp.company.replace(/\s+/g, "-").toLowerCase(),
      ...exp,
    })),
    stack: PORTFOLIO_DATA.stack,
    services: PORTFOLIO_DATA.services,
    socials: PORTFOLIO_DATA.socials,
  });
  console.log("  ✅ Site settings created\n");

  // --- Projects ---
  console.log("📦 Creating projects...");
  for (const [index, project] of PORTFOLIO_DATA.projects.entries()) {
    const doc = {
      _id: `project-${project.slug}`,
      _type: "project",
      id: project.id,
      title: project.title,
      slug: { _type: "slug", current: project.slug },
      category: project.category,
      year: project.year,
      client: project.client,
      description: project.description,
      longDescription: project.longDescription,
      challenge: project.challenge,
      solution: project.solution,
      tech: project.tech,
      order: index + 1,
      // Note: Images use external URLs — upload manually in Sanity Studio
      // or extend this script to download & upload them.
    };

    await client.createOrReplace(doc);
    console.log(`  ✅ ${project.title}`);
  }

  console.log(
    "\n🎉 Seed complete! Visit sanity.io/manage to view your content.",
  );
  console.log(
    "   ℹ️  Upload project images manually in the Sanity Studio dashboard.",
  );
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
