import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadCloud, Bot, LayoutDashboard } from "lucide-react";

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
            <Card key={index} className="text-center transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  {step.icon}
                </div>
                <CardTitle className="pt-4">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
