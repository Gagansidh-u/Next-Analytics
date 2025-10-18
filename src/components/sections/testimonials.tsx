'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    name: 'Sarah Johnson',
    title: 'CEO, TechNova',
    quote: "Nextlytics turned our data into a goldmine. Their dashboards are intuitive and have directly led to a 15% increase in our conversion rates. It's the best investment we've made this year.",
    image: PlaceHolderImages.find(p => p.id === 'testimonial-1'),
  },
  {
    name: 'Michael Chen',
    title: 'Founder, StyleHub',
    quote: "As a small business, we were drowning in spreadsheets. Nextlytics gave us clarity and a clear path to growth. The process was simple, and the results were beyond our expectations.",
    image: PlaceHolderImages.find(p => p.id === 'testimonial-2'),
  },
  {
    name: 'Emily Rodriguez',
    title: 'Marketing Director, FoodieFinds',
    quote: 'The AI insights from the Enterprise plan are a game-changer. We can now predict customer churn with surprising accuracy. Their team feels like an extension of our own.',
    image: PlaceHolderImages.find(p => p.id === 'testimonial-3'),
  },
  {
    name: 'Alex Thompson',
    title: 'CTO, Innovate Inc.',
    quote: 'The level of detail and the speed of delivery were outstanding. Next Analytics provided us with critical insights that shaped our product roadmap.',
    image: PlaceHolderImages.find(p => p.id === 'testimonial-4'),
  },
  {
    name: 'Jessica Lee',
    title: 'E-commerce Manager, Urban Threads',
    quote: 'Our sales data was a mess. The team at Next Analytics not only organized it but also revealed customer trends we never would have spotted on our own. Truly invaluable.',
    image: PlaceHolderImages.find(p => p.id === 'testimonial-5'),
  },
  {
    name: 'David Ortiz',
    title: 'Head of Operations, FinSolutions',
    quote: 'Working with Next Analytics streamlined our reporting process, saving us countless hours. The interactive dashboards allow us to get answers in seconds, not days.',
    image: PlaceHolderImages.find(p => p.id === 'testimonial-6'),
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-primary/5 py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Loved by Teams Worldwide</h2>
          <p className="mt-4 text-lg text-foreground/70">
            Don't just take our word for it. Here's what our clients have to say.
          </p>
        </div>
        <div
          className="relative mt-12 w-full overflow-hidden"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
        >
          <div className="flex w-max animate-scroll">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
               <div key={index} className="w-[350px] shrink-0 p-4 md:w-[450px]">
                <Card className="h-full">
                  <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
                    {testimonial.image && (
                      <Image
                        src={testimonial.image.imageUrl}
                        alt={`Portrait of ${testimonial.name}`}
                        width={80}
                        height={80}
                        className="mb-4 rounded-full"
                        data-ai-hint={testimonial.image.imageHint}
                      />
                    )}
                    <p className="flex-1 italic text-muted-foreground">"{testimonial.quote}"</p>
                    <div className="mt-4">
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          <style jsx>{`
            @keyframes scroll {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
            .animate-scroll {
              animation: scroll 60s linear infinite;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
