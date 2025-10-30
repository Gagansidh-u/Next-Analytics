import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping & Delivery Policy',
  description: 'Learn about the delivery of our digital services at Next Analytics. Understand how and when you will receive your analytics reports and dashboards.',
  keywords: ['digital delivery policy', 'service delivery', 'report delivery', 'Next Analytics policy'],
  robots: {
    index: true,
    follow: true,
  },
};

export default function ShippingPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
