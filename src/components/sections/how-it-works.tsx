
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadCloud, Bot, LayoutDashboard } from "lucide-react";
import { useEffect, useState } from 'react';

const steps = [
  {
    icon: <UploadCloud className="h-10 w-10 text-primary" />,
    title: "1. Upload Your Data",
    description: "Securely upload your data in any format (Excel, CSV, Google Sheets). We handle the rest, ensuring your data is safe and sound.",
  },
  {
    icon: <Bot className="h-10 w-10 text-primary" />,
    title: "2. We Clean & Analyze",
    description: "Our experts and AI algorithms clean, prepare, and analyze your data to uncover hidden patterns and key performance indicators.",
  },
  {
    icon: <LayoutDashboard className="h-10 w-10 text-primary" />,
    title: "3. Get Your Insights",
    description: "Receive a custom-built, interactive dashboard and a summary report. Your data, now clear, actionable, and ready to drive growth.",
  },
];

export default function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // A simple way to trigger the animation on mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="how-it-works" className="py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
          <p className="mt-4 text-lg text-foreground/70">
            From messy data to clear insights in just three simple steps.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} 
                 className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                 style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Card className="relative group text-center h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-transparent to-primary/20 opacity-0 group-hover:opacity-50 blur-xl animate-[spin_5s_linear_infinite]" />
                <CardHeader className="relative z-10">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    {step.icon}
                  </div>
                  <CardTitle className="pt-4">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
