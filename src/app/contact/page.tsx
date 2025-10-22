import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Mail, Phone, MessageSquare, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const contactMethods = [
  {
    icon: <Mail className="h-8 w-8 text-primary" />,
    title: 'Email Us',
    description: 'General inquiries and support.',
    details: 'contact@nextanalytics.com',
    cta: 'Send an Email',
    href: 'mailto:contact@nextanalytics.com',
  },
  {
    icon: <Phone className="h-8 w-8 text-primary" />,
    title: 'Call Us',
    description: 'Speak to our sales team.',
    details: '+91 12345 67890',
    cta: 'Call Now',
    href: 'tel:+911234567890',
  },
  {
    icon: (
      <svg
        className="h-8 w-8 text-primary"
        role="img"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M18.4 5.6c-1.8-1.8-4.2-2.8-6.9-2.8-5.4 0-9.8 4.4-9.8 9.8 0 1.8.5 3.5 1.3 5l-1.5 5.2 5.3-1.4c1.4.8 3 1.2 4.7 1.2h.1c5.4 0 9.8-4.4 9.8-9.8.1-2.6-1-5-2.9-6.8zm-6.9 16.6c-1.6 0-3.2-.5-4.5-1.4l-.3-.2-3.4.9.9-3.3-.2-.3c-1-1.4-1.6-3.1-1.6-4.9 0-4.5 3.7-8.2 8.2-8.2 2.2 0 4.3.9 5.8 2.4 1.6 1.6 2.4 3.7 2.4 5.8.1 4.5-3.6 8.2-8.2 8.2zm4.5-6.2c-.3-.1-1.6-.8-1.8-1-.2-.1-.4-.1-.6.1-.2.2-.7.8-.9 1-.2.1-.3.2-.6.1s-1.2-.4-2.2-1.3c-.8-.7-1.3-1.6-1.5-1.9-.2-.3 0-.5.1-.6s.2-.3.4-.4c.1-.1.2-.2.3-.4.1-.1.1-.2 0-.4-.1-.1-.6-1.5-.8-2-.2-.4-.3-.4-.5-.4h-.4c-.2 0-.4.1-.6.3s-.7.7-1 1.6c-.2 1 .1 1.9.1 2.1.1.1 1.5 2.3 3.6 3.2.5.2.8.3 1.1.4.5.1.9.1 1.2.1.4-.1 1.6-1 1.8-1.9.2-.8.2-1.5.1-1.6-.1-.2-.3-.3-.5-.4z" />
      </svg>
    ),
    title: 'WhatsApp',
    description: 'Chat with us for quick questions.',
    details: '+91 1234567890',
    cta: 'Start Chat',
    href: 'https://wa.me/911234567890',
  },
];

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container py-12 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
                <MessageSquare className="h-9 w-9 text-primary" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Get in Touch
            </h1>
            <p className="mt-6 text-lg text-foreground/70">
              We're here to help and answer any question you might have. We are proudly based in Barnala, Punjab, India.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {contactMethods.map((method) => (
              <Card key={method.title} className="flex flex-col text-center">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    {method.icon}
                  </div>
                  <CardTitle className="pt-4">{method.title}</CardTitle>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-center">
                  <p className="text-lg font-semibold">{method.details}</p>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button asChild className="w-full">
                    <Link href={method.href} target="_blank" rel="noopener noreferrer">
                      {method.cta}
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
             <Card className="flex flex-col text-center">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="pt-4">Our Office</CardTitle>
                  <CardDescription>Come visit us in person.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-center">
                  <p className="text-lg font-semibold">Barnala, Punjab 148101</p>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button asChild className="w-full" variant="outline">
                    <Link href="https://www.google.com/maps/search/?api=1&query=Barnala+Punjab" target="_blank" rel="noopener noreferrer">
                      Get Directions
                    </Link>
                  </Button>
                </div>
              </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
