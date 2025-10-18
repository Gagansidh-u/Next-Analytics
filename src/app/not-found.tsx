'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-background text-center">
        <div className="relative max-w-xl">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            404 - Page Not Found
          </h1>
          <p className="mt-6 text-lg text-foreground/70">
            Oops! The page you are looking for does not exist. It might have been moved or deleted.
          </p>
          <div className="mt-10">
            <Button asChild size="lg">
              <Link href="/">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Go Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
