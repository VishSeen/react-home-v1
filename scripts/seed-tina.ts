import fs from "fs";
import path from "path";
import { PORTFOLIO_DATA } from "../lib/constants";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PROJECT_DIR = path.join(CONTENT_DIR, "projects");
const GLOBAL_DIR = path.join(CONTENT_DIR, "global");

// Ensure directories exist
if (!fs.existsSync(PROJECT_DIR)) fs.mkdirSync(PROJECT_DIR, { recursive: true });
if (!fs.existsSync(GLOBAL_DIR)) fs.mkdirSync(GLOBAL_DIR, { recursive: true });

// 1. Write Global Settings (JSON)
const { projects, ...siteSettings } = PORTFOLIO_DATA;
// Add social defaults if missing in PORTFOLIO_DATA (it has socials object but check structure)
const globalData = {
  ...siteSettings,
  // Ensure strict schema match if needed, but extra fields are usually ignored or preserved in JSON
};

fs.writeFileSync(
  path.join(GLOBAL_DIR, "index.json"),
  JSON.stringify(globalData, null, 2)
);
console.log("✅ Global settings seeded.");

// 2. Write Projects (Markdown)
projects.forEach((project, index) => {
  const { id, slug, title, category, year, client, description, longDescription, challenge, solution, image, tech } = project;

  // Create frontmatter
  const frontmatter = [
    "---",
    `title: "${title}"`,
    `slug: "${slug}"`,
    `displayId: "${id}"`,
    `category: "${category}"`,
    `year: "${year}"`,
    `client: "${client}"`,
    `description: "${description.replace(/"/g, '\\"')}"`,
    `longDescription: "${longDescription.replace(/"/g, '\\"')}"`,
    `challenge: "${challenge ? challenge.replace(/"/g, '\\"') : ''}"`,
    `solution: "${solution ? solution.replace(/"/g, '\\"') : ''}"`,
    `image: "${image}"`,
    `order: ${index + 1}`,
    "tech:",
    ...tech.map(t => `  - "${t}"`),
    "---",
    "", // Empty body for now
  ].join("\n");

  fs.writeFileSync(path.join(PROJECT_DIR, `${slug}.md`), frontmatter);
  console.log(`✅ Project seeded: ${slug}`);
});
