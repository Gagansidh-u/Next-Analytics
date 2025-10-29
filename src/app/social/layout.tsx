import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Social Media',
  description: 'Find Next Analytics on social media. Follow us for the latest updates, news, and insights on data analytics.',
};

export default function SocialLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
