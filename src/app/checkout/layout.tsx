import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your order and start your journey with Next Analytics. Secure payment for our data analytics plans.',
  robots: {
    index: false, // No need to index the checkout page
    follow: false,
  },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
