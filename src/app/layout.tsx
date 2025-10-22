import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import CursorGlow from '@/components/cursor-glow';
import Script from 'next/script';

const siteUrl = 'https://nextanalytics.store';

export const metadata: Metadata = {
  title: 'Next Analytics | Data Analytics in Barnala, Punjab',
  description: 'Top data analytics and business intelligence services in Barnala, Punjab. We help startups and SMBs in Punjab turn raw data into actionable insights and revenue.',
  applicationName: 'Next Analytics',
  keywords: ['data analytics Barnala', 'business intelligence Punjab', 'startup analytics Barnala', 'smb data Punjab', 'dashboard reporting', 'data insights', 'Next Analytics Barnala'],
  authors: [{ name: 'Next Analytics' }],
  creator: 'Next Analytics',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Next Analytics | Data Analytics in Barnala, Punjab',
    description: 'Affordable, fast data analytics in Barnala to help startups & SMBs in Punjab make data-driven decisions.',
    siteName: 'Next Analytics',
    images: [
      {
        url: '/og-image.png', 
        width: 1200,
        height: 630,
        alt: 'Next Analytics turning data into revenue in Barnala',
      },
    ],
    locale: 'en_IN',
    countryName: 'India',
    locality: 'Barnala',
    region: 'Punjab',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Next Analytics | Data Analytics in Barnala, Punjab',
    description: 'Affordable, fast data analytics in Barnala to help startups & SMBs in Punjab make data-driven decisions.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="icon" href="https://github.com/Gagansidh-u/My-Webapp/blob/master/Picsart_25-10-18_16-37-29-081.png?raw=true" type="image/png" />
      </head>
      <body className={cn("font-body antialiased")}>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-YVBZ3Q9BYW"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-YVBZ3Q9BYW');
            `,
          }}
        />
        <CursorGlow />
        <div className="relative z-10">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
