import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import AnimatedHeroBackground from '@/components/animated-hero-background';

export default function Hero() {
  return (
    <section className="relative bg-background py-20 md:py-32 overflow-hidden">
      <AnimatedHeroBackground />
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-foreground/80 ring-1 ring-border hover:ring-primary/50">
              Trusted by 500+ startups.{' '}
              <div className="ml-1 inline-flex items-center text-yellow-400">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            Turn Your Raw Data into Tangible Revenue
          </h1>
          <p className="mt-6 text-lg text-foreground/70">
            Next Analytics provides simple, fast, and affordable data analytics for startups and SMBs. We transform your scattered data into clear insights, interactive dashboards, and actionable reports.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" asChild>
              <Link href="#pricing">
                Get Your Free Proposal
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
