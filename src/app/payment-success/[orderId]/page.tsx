// src/app/payment-success/[orderId]/page.tsx
'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, UploadCloud, ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

function SuccessPageContent() {
    const params = useParams();
    const searchParams = useSearchParams();
    const { toast } = useToast();

    const orderId = Array.isArray(params.orderId) ? params.orderId[0] : params.orderId;
    const status = searchParams.get('status');

    useEffect(() => {
        if (status === 'success') {
            toast({
                title: "Payment Successful!",
                description: "Your order has been confirmed.",
            });
        }
    }, [status, toast]);
    

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 bg-background py-12 md:py-20">
                <div className="container max-w-2xl">
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle>Payment Successful!</CardTitle>
                            <CardDescription>Your order is complete. Please follow the steps below.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center p-4 md:p-8 space-y-6">
                                <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                                
                                <div className="p-4 bg-card rounded-lg border">
                                    <p className="text-muted-foreground">Your Order ID:</p>
                                    <p className="font-mono text-sm break-all">{orderId}</p>
                                </div>

                                <div className="space-y-4 rounded-lg border bg-card p-4">
                                    <h3 className="text-lg font-semibold">Next Step: Upload Your Data</h3>
                                    <Button asChild size="lg" variant="secondary">
                                        <Link href="https://forms.gle/a8Yhowx9EutCwbcw7" target="_blank">
                                            <UploadCloud className="mr-2 h-5 w-5" />
                                            Proceed to Data Upload Form
                                        </Link>
                                    </Button>
                                    <p className="text-sm text-muted-foreground">
                                        Lost this link later? <Link href="/lost-form" className="underline">Recover it here</Link>.
                                    </p>
                                </div>

                                <div className="mt-8">
                                     <Button asChild variant="outline">
                                        <Link href="/">
                                            <ArrowLeft className="mr-2 h-4 w-4" />
                                            Back to Home
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
}


export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={<div>Loading payment details...</div>}>
            <SuccessPageContent />
        </Suspense>
    )
}
