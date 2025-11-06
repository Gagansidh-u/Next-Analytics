
'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Download, Lock, Unlock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { generateInvoice, InvoiceData } from '@/lib/invoice';

function FreeSuccessContent() {
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const [isInvoiceDownloaded, setIsInvoiceDownloaded] = useState(false);

    const name = searchParams.get('name') || 'Valued Customer';
    const email = searchParams.get('email') || 'N/A';
    const planName = searchParams.get('plan') || 'Basic Plan';
    const planPrice = parseFloat(searchParams.get('price') || '5000');
    
    const orderId = `FREE-${Date.now()}`;

    useEffect(() => {
        toast({
            title: "Order Successful!",
            description: "Your free order has been confirmed.",
        });
    }, [toast]);
    
    const handleDownloadInvoice = () => {
        const invoiceData: InvoiceData = {
            orderId: orderId,
            paymentId: 'FREE-ORDER',
            customer: {
                name: name,
                email: email,
            },
            plan: {
                name: planName,
                price: planPrice,
            },
            coupon: {
                code: '25072005',
                discount: planPrice,
                isPay1: false
            },
            gst: 0,
            total: 0,
        };

        generateInvoice(invoiceData);
        setIsInvoiceDownloaded(true);
        toast({
            title: "Invoice Downloaded",
            description: "You can now proceed to upload your data.",
        });
    };
    
    const handleProceedToUpload = () => {
        if (isInvoiceDownloaded) {
            window.open('https://forms.gle/a8Yhowx9EutCwbcw7', '_blank');
        }
    };

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 flex items-center justify-center bg-background py-12 md:py-20">
                <div className="container max-w-2xl">
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle>Order Successful!</CardTitle>
                            <CardDescription>Your order is complete. Please follow the steps below.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center p-4 md:p-8 space-y-6">
                                <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                                <p className="text-lg text-foreground/80">
                                    Thank you, {name}! Your free order is confirmed.
                                </p>
                                
                                 <div className="p-4 bg-card rounded-lg border">
                                    <p className="text-muted-foreground">Your Order ID:</p>
                                    <p className="font-mono text-sm break-all">{orderId}</p>
                                </div>
                                
                                <div className="space-y-4 rounded-lg border bg-card p-4">
                                    <h3 className="text-lg font-semibold">Step 1: Download Your Invoice (Required)</h3>
                                    <Button onClick={handleDownloadInvoice} size="lg">
                                        <Download className="mr-2 h-5 w-5" />
                                        Download Invoice
                                    </Button>
                                </div>

                                <div className="space-y-4 rounded-lg border bg-card p-4">
                                    <h3 className="text-lg font-semibold">Step 2: Upload Your Data</h3>
                                    <Button onClick={handleProceedToUpload} size="lg" variant="secondary" disabled={!isInvoiceDownloaded}>
                                        {isInvoiceDownloaded ? <Unlock className="mr-2 h-5 w-5" /> : <Lock className="mr-2 h-5 w-5" />}
                                        Proceed to Data Upload Form
                                    </Button>
                                    {!isInvoiceDownloaded && (
                                        <p className="text-sm text-muted-foreground">
                                           Please download your invoice to unlock this step.
                                        </p>
                                    )}
                                    <p className="text-sm text-muted-foreground pt-2">
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


export default function FreePaymentSuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <FreeSuccessContent />
        </Suspense>
    );
}
