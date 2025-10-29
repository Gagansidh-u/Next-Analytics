import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Enterprise Solutions',
  description: 'Custom, AI-powered analytics for large-scale businesses. Contact us for a demo.',
  robots: {
    index: false, // Don't index this page for now
    follow: false,
  },
};

export default function EnterpriseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
