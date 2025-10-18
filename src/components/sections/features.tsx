import { FileUp, Brush, AreaChart, PieChart, FileText, Bot } from 'lucide-react';

const features = [
  {
    icon: <FileUp className="h-8 w-8 text-primary" />,
    name: 'Data Upload',
    description: 'Accept file formats: Excel (.xlsx), CSV (.csv), or Google Sheets link.',
  },
  {
    icon: <Brush className="h-8 w-8 text-primary" />,
    name: 'Data Cleaning & Preparation',
    description: 'We remove duplicates, handle missing values, and fix formatting issues.',
  },
  {
    icon: <AreaChart className="h-8 w-8 text-primary" />,
    name: 'Basic Data Analysis',
    description: 'Calculate essential KPIs like total sales, customers, and average order value.',
  },
  {
    icon: <PieChart className="h-8 w-8 text-primary" />,
    name: 'Dashboard Creation',
    description: 'Get interactive dashboards with line, bar, and pie charts, tables, and KPI cards.',
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    name: 'PDF Reporting',
    description: 'Receive a concise PDF summary report highlighting key insights from your data.',
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    name: 'AI-Powered Insights',
    description: 'For enterprise clients, unlock predictive analytics and AI-driven recommendations.',
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-primary/5 py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything You Need to Succeed</h2>
          <p className="mt-4 text-lg text-foreground/70">
            A complete suite of data tools to help you make smarter, faster decisions.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.name} className="flex flex-col items-start">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-background shadow-md">
                {feature.icon}
              </div>
              <h3 className="mt-6 text-lg font-semibold">{feature.name}</h3>
              <p className="mt-2 text-base text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
