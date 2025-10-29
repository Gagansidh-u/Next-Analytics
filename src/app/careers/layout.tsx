import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers at Next Analytics',
  description: 'Join our team! We are looking for passionate individuals to help us democratize data analytics. See open positions at Next Analytics.',
  keywords: ['Next Analytics careers', 'data analyst jobs', 'tech jobs Barnala', 'startup jobs Punjab'],
  openGraph: {
    title: 'Careers at Next Analytics',
    description: 'Find your next great role and help us build the future of data analytics.',
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
