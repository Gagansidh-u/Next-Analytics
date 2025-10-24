'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: '₹5000',
    description: 'Perfect for startups and small businesses who want simple and clear insights.',
    features: [
      { text: 'Up to 10,000 data rows', included: true },
      { text: 'Single data source', included: true },
      { text: 'One interactive dashboard', included: true },
      { text: '5 Standard Charts', included: true },
      { text: 'Data cleaning & formatting', included: true },
      { text: 'PDF Summary Report', included: true },
      { text: 'Email support', included: true },
      { text: 'No predictions / AI insights', included: false },
      { text: 'No live dashboard updates', included: false },
    ],
    cta: 'Choose Basic',
    href: '/checkout?plan=basic'
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '₹12000',
    description: 'A complete business intelligence solution for growing teams.',
    features: [
      { text: 'Up to 100,000 data rows', included: true },
      { text: 'Multiple data sources', included: true },
      { text: '3 interactive dashboards', included: true },
      { text: 'Advanced KPI metrics', included: true },
      { text: 'Drill-down filters & slicers', included: true },
      { text: 'Trend analysis + Forecasting', included: true },
      { text: 'Automated weekly data refresh', included: true },
      { text: 'Actionable Insights Report', included: true },
      { text: 'Priority Email & Chat support', included: true },
    ],
    cta: 'Choose Professional',
    popular: true,
    href: '/checkout?plan=professional'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    description: 'Full-scale data system for enterprises and serious data-driven companies.',
    features: [
      { text: 'Unlimited data volume', included: true },
      { text: 'Live dashboard integrations', included: true },
      { text: 'Custom analytics portal', included: true },
      { text: 'AI-based Insights + Predictions', included: true },
      { text: 'Real-time reporting', included: true },
      { text: 'Data warehouse setup (optional)', included: true },
      { text: 'Dedicated Analyst + Support team', included: true },
      { text: 'Zoom strategy call + training', included: true },
    ],
    cta: 'Contact Sales',
    isEnterprise: true,
    comingSoon: true,
    href: '/coming-soon'
  },
];

export default function Pricing() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="pricing" className="py-16 sm:py-24">
       <style jsx>{`
        .light-sweep::before {
          content: '';
          position: absolute;
          top: 0;
          left: -150%;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, transparent, hsla(var(--primary), 0.2), transparent);
          transform: skewX(-25deg);
          transition: left 0.75s ease-in-out;
        }
        .light-sweep:hover::before {
          left: 150%;
        }
      `}</style>
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Simple, Transparent Pricing</h2>
          <p className="mt-4 text-lg text-foreground/70">
            Choose the perfect plan for your business. No hidden fees, no surprises.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            All prices are inclusive of 18% GST.
          </p>
        </div>
        <div className="mt-12 mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={cn(
                'transition-all duration-500',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
                 // Make professional plan span 2 columns on lg screens, and enterprise takes the last spot
                {
                  'lg:col-span-1': plan.id === 'basic',
                  'lg:col-span-1': plan.id === 'professional',
                  'lg:col-span-1': plan.id === 'enterprise'
                }
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Card
                className={cn(
                  'flex flex-col h-full relative overflow-hidden transition-all duration-300 ease-in-out light-sweep hover:shadow-primary/20 hover:shadow-2xl hover:-translate-y-2',
                  plan.popular ? 'border-primary ring-2 ring-primary' : ''
                )}
              >
                <CardHeader className="relative">
                  <div className="flex items-center justify-between">
                    <CardTitle>{plan.name}</CardTitle>
                    {plan.popular && (
                      <Badge>Most Popular</Badge>
                    )}
                    {plan.comingSoon && (
                       <Badge variant="outline">Coming Soon</Badge>
                    )}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="pt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature.text} className="flex items-center">
                        {feature.included ? (
                          <Check className="mr-2 h-5 w-5 text-green-500" />
                        ) : (
                          <X className="mr-2 h-5 w-5 text-red-500" />
                        )}
                        <span className="text-sm text-muted-foreground">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex-col items-stretch gap-4">
                   <Button asChild className="w-full" variant={plan.popular ? 'default' : 'outline'} disabled={plan.comingSoon}>
                      <Link href={plan.href}>
                        {plan.cta}
                      </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
