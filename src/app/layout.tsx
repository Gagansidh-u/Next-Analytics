import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import CursorGlow from '@/components/cursor-glow';
import Script from 'next/script';

const siteUrl = 'https://your-domain.com'; // Replace with your actual domain

export const metadata: Metadata = {
  title: 'Next Analytics | Actionable Data Insights for Startups & SMBs',
  description: 'Simple, fast, and affordable data analytics for startups and SMBs. We turn your raw data into actionable insights, interactive dashboards, and AI-powered reports to drive revenue.',
  applicationName: 'Next Analytics',
  keywords: ['data analytics', 'business intelligence', 'startup analytics', 'smb data', 'dashboard reporting', 'data insights', 'revenue growth'],
  authors: [{ name: 'Next Analytics' }],
  creator: 'Next Analytics',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Next Analytics | Turn Data into Revenue',
    description: 'Affordable, fast data analytics to help startups & SMBs make data-driven decisions and grow revenue.',
    siteName: 'Next Analytics',
    images: [
      {
        url: '/og-image.png', // It's recommended to create and add an og-image.png file to your public folder
        width: 1200,
        height: 630,
        alt: 'Next Analytics turning data into revenue',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Next Analytics | Turn Data into Revenue',
    description: 'Affordable, fast data analytics to help startups & SMBs make data-driven decisions and grow revenue.',
    images: ['/og-image.png'], // Ensure you have this image in your public folder
  },
  icons: {
    icon: '/favicon.png', // It's recommended to add a favicon.png to your public folder
    apple: '/apple-touch-icon.png', // It's recommended to add an apple-touch-icon.png to your public folder
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
