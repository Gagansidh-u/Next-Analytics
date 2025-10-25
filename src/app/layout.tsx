import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import CursorGlow from '@/components/cursor-glow';
import Script from 'next/script';
import { FirebaseClientProvider } from '@/firebase';

const siteUrl = 'https://nextanalytics.store';
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;


export const metadata: Metadata = {
  title: 'Next Analytics | Data Analytics in Barnala, Punjab, and India',
  description: 'Next Analytics: Top data analytics and business intelligence services based in Barnala, Punjab. We help startups and SMBs across India turn raw data into actionable insights and revenue. Your top choice for Next Analytics in Punjab.',
  applicationName: 'Next Analytics',
  keywords: ['Next Analytics', 'Next Analytics Barnala', 'Next Analytics Punjab', 'Next Analytics India', 'data analytics Barnala', 'business intelligence Punjab', 'startup analytics India', 'smb data Punjab', 'dashboard reporting', 'data insights'],
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
    title: 'Next Analytics | Data Analytics for India, Punjab & Barnala',
    description: 'Affordable, fast data analytics from Next Analytics in Barnala to help startups & SMBs in Punjab and across India make data-driven decisions.',
    siteName: 'Next Analytics',
    images: [
      {
        url: '/og-image.png', 
        width: 1200,
        height: 630,
        alt: 'Next Analytics turning data into revenue in Barnala, Punjab',
      },
    ],
    locale: 'en_IN',
    countryName: 'India',
    locality: 'Barnala',
    region: 'Punjab',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Next Analytics | Data Analytics in Barnala, Punjab, India',
    description: 'Affordable data analytics in Barnala by Next Analytics to help startups & SMBs in Punjab and India make data-driven decisions.',
    images: ['/og-image.png'],
  },
icons: {
    icon: 'https://github.com/Gagansidh-u/My-Webapp/blob/master/Picsart_25-10-18_16-37-29-081.png?raw=true',
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
        <meta name="robots" content="index, follow" />
        {GA_TRACKING_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={cn("font-body antialiased")}>
        <FirebaseClientProvider>
          <CursorGlow />
          <div className="relative z-10">
            {children}
          </div>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
