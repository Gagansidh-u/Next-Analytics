import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { MailQuestion, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lost Data Upload Form',
  description: 'Lost your data submission link after payment? Follow these simple steps to recover it by contacting our helpdesk.',
  robots: {
    index: false,
    follow: true,
  },
};


export default function LostFormPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-background text-center">
        <div className="relative max-w-2xl px-4">
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
              <MailQuestion className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Lost Your Data Upload Link?
            </h1>
            <p className="mt-6 text-lg text-foreground/70">
              Don't worry, we can help you get back on track. If you've completed your payment but accidentally closed the page with the data submission form, please follow the simple steps below.
            </p>
            <div className="prose prose-lg dark:prose-invert mx-auto mt-10 text-left text-foreground/80 bg-card p-8 rounded-lg shadow-lg">
                <h2 className="text-center">Recovery Steps</h2>
                <ol>
                    <li>
                        <strong>Find Your Invoice:</strong> Locate the invoice PDF that you downloaded immediately after your successful payment. This file is named something like `Invoice-XXXXXXXX.pdf`.
                    </li>
                    <li>
                        <strong>Compose an Email:</strong> Open your email client and start a new message. It is crucial that you send this email from the same address you used during the checkout process.
                    </li>
                    <li>
                        <strong>Address and Subject:</strong>
                        <ul>
                            <li><strong>To:</strong> <a href="mailto:helpdesk.grock@outlook.com">helpdesk.grock@outlook.com</a></li>
                            <li><strong>Subject:</strong> Lost Data Upload Link - Invoice [Your Invoice Number]</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Attach and Send:</strong> Attach the invoice PDF to your email and send it. Our support team will verify your purchase and email you a new link to the data submission form.
                    </li>
                </ol>
            </div>
            <div className="mt-10">
                <Button asChild size="lg">
                    <Link href="/">
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Go Back to Home
                    </Link>
                </Button>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
