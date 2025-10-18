'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Share2, ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function SocialComingSoonPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-background text-center">
        <div className="relative">
          <div className="absolute -top-20 -left-20 h-40 w-40 animate-blob rounded-full bg-primary/20 opacity-50 blur-2xl filter" />
          <div className="animation-delay-2000 absolute -bottom-20 -right-20 h-40 w-40 animate-blob rounded-full bg-accent/20 opacity-50 blur-2xl filter" />
          <div className="animation-delay-4000 absolute -bottom-20 -left-20 h-40 w-40 animate-blob rounded-full bg-secondary/20 opacity-50 blur-2xl filter" />

          <style jsx>{`
            @keyframes blob {
              0% {
                transform: translate(0px, 0px) scale(1);
              }
              33% {
                transform: translate(30px, -50px) scale(1.1);
              }
              66% {
                transform: translate(-20px, 20px) scale(0.9);
              }
              100% {
                transform: translate(0px, 0px) scale(1);
              }
            }
            .animate-blob {
              animation: blob 7s infinite;
            }
            .animation-delay-2000 {
              animation-delay: 2s;
            }
            .animation-delay-4000 {
              animation-delay: 4s;
            }
          `}</style>
          
          <div className="relative z-10 max-w-xl">
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
              <Share2 className="h-12 w-12 animate-pulse text-primary" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
              Our Socials Are Coming Soon!
            </h1>
            <p className="mt-6 text-lg text-foreground/70">
              We're getting our social media profiles ready. Follow us soon to stay updated on the latest news, features, and insights from Next Analytics!
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
