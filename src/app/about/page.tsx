import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Building } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container py-12 md:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
                  <Building className="h-9 w-9 text-primary" />
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                About Next Analytics
              </h1>
              <p className="mt-6 text-lg text-foreground/70">
                We are on a mission to democratize data analytics for businesses of all sizes.
              </p>
            </div>
            <div className="prose prose-lg dark:prose-invert mx-auto mt-12 text-foreground/80">
              <p>
                Founded in 2024, Next Analytics started with a simple idea: that every business, regardless of its size, should have access to powerful data insights without the complexity and high cost of traditional business intelligence tools. We saw countless startups and small-to-medium-sized businesses drowning in spreadsheets, unable to extract the valuable information locked within their own data.
              </p>
              <p>
                Our team of data scientists, engineers, and designers is passionate about turning raw data into clear, actionable, and beautiful visualizations. We believe that making data-driven decisions should be intuitive, not intimidating. That's why we've built a service that is not only affordable but also incredibly easy to use.
              </p>
              <blockquote>
                Our goal is to be your trusted partner in growth, providing the clarity you need to navigate the complexities of your market and achieve your goals.
              </blockquote>
              <p>
                From data cleaning and analysis to creating interactive dashboards and leveraging AI for predictive insights, we handle the heavy lifting so you can focus on what you do best: running your business.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
