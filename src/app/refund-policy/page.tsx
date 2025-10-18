import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { CircleDollarSign } from 'lucide-react';

export default function RefundPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container py-12 md:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
                    <CircleDollarSign className="h-9 w-9 text-primary" />
                </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                Refund Policy
              </h1>
              <p className="mt-6 text-lg text-foreground/70">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="prose prose-lg dark:prose-invert mx-auto mt-12 text-foreground/80">
              <h2>Our Policy</h2>
              <p>
                Thank you for choosing Next Analytics. We are committed to providing our clients with high-quality data analytics services.
              </p>
              <p>
                Due to the nature of our services, which involve significant upfront data processing, analysis, and custom report generation, <strong>we have a strict no-refund policy</strong>. All sales are final.
              </p>
              <p>
                Once a service has been purchased and our team has commenced work, we are unable to offer a refund, exchange, or credit. We invest considerable time and resources into each project from the moment of engagement, and this policy reflects the irreversible nature of that work.
              </p>
              <h2>Revisions</h2>
              <p>
                While we do not offer refunds, we are dedicated to your satisfaction. Our Basic and Professional plans include a set number of revisions as specified in the plan details. We will work with you to ensure the final deliverables meet your expectations within the scope of the purchased plan.
              </p>
              <h2>Questions</h2>
              <p>
                If you have any questions about our Refund Policy, please contact us before making a purchase.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
