import { config } from "dotenv";
config({ path: ".env.local" });

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function check() {
  const docs = await client.fetch(
    '*[_type in ["project", "siteSettings"]] { _type, _id, title, name }',
  );
  console.log("Documents found in Sanity:", docs.length);
  console.log(JSON.stringify(docs, null, 2));
}

check().catch(console.error);
