import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container py-12 md:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
                <ShieldCheck className="h-9 w-9 text-primary" />
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                Privacy Policy
              </h1>
              <p className="mt-6 text-lg text-foreground/70">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="prose prose-lg dark:prose-invert mx-auto mt-12 text-foreground/80">
              <h2>1. Our Commitment to Privacy</h2>
              <p>
                Your privacy is critically important to us. At Next Analytics, we have a few fundamental principles:
                We don’t ask you for personal information unless we truly need it.
                We don’t share your personal information with anyone except to comply with the law, develop our products, or protect our rights.
                We don’t store personal information on our servers unless required for the on-going operation of one of our services.
              </p>
              <h2>2. Information We Collect</h2>
              <p>
                We only collect information about you if we have a reason to do so–for example, to provide our Services, to communicate with you, or to make our Services better. We collect this information from three sources: if and when you provide information to us, automatically through operating our Services, and from outside sources.
              </p>
              <h2>3. Data You Provide to Us</h2>
              <p>
                The core of our service is analyzing the data you provide. This data is yours. We will use it exclusively to provide you with the analytics services you have purchased. Your data is treated as strictly confidential.
              </p>
              <h2>4. Security</h2>
              <p>
                We take all measures reasonably necessary to protect against the unauthorized access, use, alteration, or destruction of potentially personally-identifying and personally-identifying information, as well as your provided business data.
              </p>
              <h2>5. Policy Changes</h2>
              <p>
                Although most changes are likely to be minor, Next Analytics may change its Privacy Policy from time to time, and in Next Analytics’s sole discretion. We encourage visitors to frequently check this page for any changes to its Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
