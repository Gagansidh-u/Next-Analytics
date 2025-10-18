import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import EnterpriseTool from '@/components/enterprise-tool';
import { Bot, LineChart } from 'lucide-react';

export default function EnterprisePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-12 md:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
                <Bot className="h-9 w-9 text-primary" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              AI-Powered Enterprise Insights
            </h1>
            <p className="mt-6 text-lg text-foreground/70">
              Unlock predictive analytics and strategic recommendations. Upload your enterprise data to receive custom insights, identify key trends, and generate forecasts powered by our advanced AI.
            </p>
          </div>
          <div className="mt-12">
            <EnterpriseTool />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
