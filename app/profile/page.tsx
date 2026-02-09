import type { Metadata } from "next";
import { ProfileContent } from "@/components/profile/ProfileContent";
import { getSiteSettings } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Profile | Vishroy Seenarain",
  description:
    "Senior Software Engineer bridging logic and emotion — experience, technical stack, and capabilities.",
};

export default async function ProfilePage() {
  const settings = await getSiteSettings();

  return <ProfileContent settings={settings} />;
}
