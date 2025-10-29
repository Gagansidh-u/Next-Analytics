import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coming Soon',
  description: 'Something exciting is coming soon to Next Analytics. Stay tuned!',
};

export default function ComingSoonLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
