'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Cta() {
  return (
    <section id="cta" className="bg-primary/5 py-16 sm:py-24">
      <div className="container">
        <div className="relative isolate overflow-hidden rounded-2xl bg-primary px-6 py-16 text-center text-primary-foreground shadow-2xl transition-all duration-300 hover:shadow-primary/40 group light-sweep">
           <style jsx>{`
            .light-sweep::before {
              content: '';
              position: absolute;
              top: 0;
              left: -150%;
              width: 50%;
              height: 100%;
              background: linear-gradient(to right, transparent, hsla(var(--accent), 0.3), transparent);
              transform: skewX(-25deg);
              transition: left 0.85s ease-in-out;
            }
            .light-sweep:hover::before {
              left: 150%;
            }
          `}</style>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl transition-transform duration-300 group-hover:scale-105">
            Ready to unlock your data's potential?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
            Stop guessing and start making data-driven decisions. Get your personalized dashboard and see your business in a new light.
          </p>
          <div className="mt-8 transition-transform duration-300 group-hover:scale-105">
            <Button size="lg" variant="secondary" asChild>
              <Link href="#pricing">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] animate-pulse-slow"
            aria-hidden="true"
          >
            <circle cx={512} cy={512} r={512} fill="url(#gradient)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="gradient">
                <stop stopColor="hsl(var(--accent))" />
                <stop offset={1} stopColor="hsl(var(--primary))" stopOpacity={0} />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}
