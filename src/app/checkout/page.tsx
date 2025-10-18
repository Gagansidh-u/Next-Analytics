// @/app/checkout/page.tsx
'use client';

import { Suspense } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import CheckoutForm from '@/components/checkout-form';

function CheckoutPageContent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container py-12 md:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Complete Your Order
            </h1>
            <p className="mt-6 text-lg text-foreground/70">
              You're one step away from unlocking powerful insights. Please review your order and complete the payment.
            </p>
          </div>
          <div className="mt-12">
            <CheckoutForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CheckoutPageContent />
        </Suspense>
    )
}
