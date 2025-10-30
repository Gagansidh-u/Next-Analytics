import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Truck } from 'lucide-react';
import type { Metadata } from 'next';

export default function ShippingPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container py-12 md:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
                <Truck className="h-9 w-9 text-primary" />
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                Shipping & Delivery Policy
              </h1>
              <p className="mt-6 text-lg text-foreground/70">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="prose prose-lg dark:prose-invert mx-auto mt-12 text-foreground/80">
              <h2>1. Scope of Policy</h2>
              <p>
                This Shipping & Delivery Policy outlines the terms and conditions for the delivery of our digital services. Next Analytics provides data analysis, dashboard creation, and reporting services, all of which are delivered electronically.
              </p>
              <h2>2. Service Delivery</h2>
              <p>
                All our products and services are digital. Upon successful completion of your order and submission of your data, our team will begin the analysis and creation process. The final deliverables will be sent to the email address you provided during checkout.
              </p>
              <ul>
                <li><strong>Interactive Dashboards:</strong> A secure link to your private, interactive dashboard will be emailed to you.</li>
                <li><strong>PDF Reports:</strong> Your summary report will be attached to the delivery email as a PDF file.</li>
              </ul>
              <h2>3. Delivery Timeline</h2>
              <p>
                Our standard delivery timeframes are as follows, beginning from the time we receive your complete and correctly formatted data:
              </p>
              <ul>
                <li><strong>Basic Plan:</strong> 2-3 business days.</li>
                <li><strong>Professional Plan:</strong> 3-5 business days.</li>
                <li><strong>Enterprise Plan:</strong> Custom timeline as agreed upon during the consultation phase.</li>
              </ul>
              <p>
                Please note that business days do not include weekends or public holidays in India. Delays in data submission or requests for revisions may extend the delivery timeline.
              </p>
              <h2>4. No Physical Shipping</h2>
              <p>
                As a digital service provider, we do not ship any physical products. No shipping charges will be applied to your order. All deliverables are electronic.
              </p>
               <h2>5. Confirmation of Delivery</h2>
              <p>
                An order is considered "delivered" once the email containing the links to your dashboard and/or your PDF report has been sent to your registered email address. If you do not receive your deliverables within the specified timeline, please check your spam/junk folder before contacting our support team.
              </p>
              <h2>6. Contact Us</h2>
              <p>
                If you have any questions about our Shipping & Delivery Policy, please contact us at <a href="mailto:Nextanalytics@outlook.com">Nextanalytics@outlook.com</a>.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
