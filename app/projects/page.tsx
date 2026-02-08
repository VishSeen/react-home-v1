import type { Metadata } from 'next';
import { ArchiveContent } from '@/components/archive/ArchiveContent';

export const metadata: Metadata = {
  title: 'Selected Works | Vishroy Seenarain',
  description:
    'A comprehensive index of commercial projects, experimental prototypes, and open source contributions.',
};

export default function ArchivePage() {
  return <ArchiveContent />;
}
