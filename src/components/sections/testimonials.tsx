import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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
        <Carousel
          opts={{ align: 'start', loop: true }}
          className="mx-auto mt-12 w-full max-w-xs sm:max-w-xl lg:max-w-4xl"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
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
                      <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
                      <div className="mt-4">
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex"/>
          <CarouselNext className="hidden sm:flex"/>
        </Carousel>
      </div>
    </section>
  );
}
