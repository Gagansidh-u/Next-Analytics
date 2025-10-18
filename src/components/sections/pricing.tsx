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
    href: '/coming-soon'
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
    href: '/coming-soon'
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Simple, Transparent Pricing</h2>
          <p className="mt-4 text-lg text-foreground/70">
            Choose the perfect plan for your business. No hidden fees, no surprises.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                'flex flex-col',
                plan.popular ? 'border-primary ring-2 ring-primary shadow-lg' : ''
              )}
            >
              <CardHeader className="relative">
                {plan.popular && (
                  <Badge className="absolute right-6 top-6">Most Popular</Badge>
                )}
                <CardTitle>{plan.name}</CardTitle>
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
                 <Button asChild className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                    <Link href={plan.href}>
                      {plan.cta}
                    </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
