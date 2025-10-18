import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container py-12 md:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
                <FileText className="h-9 w-9 text-primary" />
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                Terms and Conditions
              </h1>
              <p className="mt-6 text-lg text-foreground/70">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="prose prose-lg dark:prose-invert mx-auto mt-12 text-foreground/80">
              <h2>1. Introduction</h2>
              <p>
                Welcome to Next Analytics. These Terms and Conditions govern your use of our services and website. By accessing or using our service, you agree to be bound by these terms.
              </p>
              <h2>2. Services</h2>
              <p>
                Next Analytics provides data analysis, dashboard creation, and reporting services as described on our website. The scope of services is determined by the plan you purchase.
              </p>
              <h2>3. User Data</h2>
              <p>
                You retain all rights to the data you provide to us. We will use your data solely for the purpose of providing the agreed-upon services. We will not share, sell, or misuse your data. Please refer to our Privacy Policy for more details.
              </p>
              <h2>4. Payments and Refunds</h2>
              <p>
                All payments for our services are processed through our third-party payment provider, Razorpay. All transactions are final. Please see our Refund Policy for more information.
              </p>
              <h2>5. Limitation of Liability</h2>
              <p>
                Next Analytics will not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
              </p>
              <h2>6. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new Terms and Conditions on this page.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
