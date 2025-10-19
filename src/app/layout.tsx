import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import CursorGlow from '@/components/cursor-glow';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Next Analytics | Turn Data into Revenue',
  description: 'Simple, fast, and affordable data analytics for startups and SMBs. We turn your raw data into actionable insights, dashboards, and reports.',
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
