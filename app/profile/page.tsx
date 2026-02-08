import type { Metadata } from 'next';
import { ProfileContent } from '@/components/profile/ProfileContent';

export const metadata: Metadata = {
  title: 'Profile | Vishroy Seenarain',
  description:
    'Senior Software Engineer bridging logic and emotion — experience, technical stack, and capabilities.',
};

export default function ProfilePage() {
  return <ProfileContent />;
}
