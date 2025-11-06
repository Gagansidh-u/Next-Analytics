// src/app/payment-success/[orderId]/page.tsx
'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, UploadCloud, ArrowLeft, Download, Lock, Unlock } from 'lucide-react';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { generateInvoice, InvoiceData } from '@/lib/invoice';

const plans = {
  basic: { name: 'Basic Plan', price: 5000 },
  professional: { name: 'Professional Plan', price: 12000 },
};

const GST_RATE = 0.18;

function SuccessPageContent() {
    const params = useParams();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const [isInvoiceDownloaded, setIsInvoiceDownloaded] = useState(false);

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
    
    const handleDownloadInvoice = () => {
        const customerName = searchParams.get('name') || 'Customer';
        const customerEmail = searchParams.get('email') || 'N/A';
        const planName = searchParams.get('planName') || 'Analytics Plan';
        const total = parseFloat(searchParams.get('total') || '0');
        const paymentId = searchParams.get('paymentId') || 'N/A';
        const couponCode = searchParams.get('coupon')?.toUpperCase();

        const planPrice = total / (1 + GST_RATE);
        const gst = total - planPrice;
        
        let planDetails;
        if(planName.toLowerCase().includes('basic')) planDetails = plans.basic;
        else if (planName.toLowerCase().includes('professional')) planDetails = plans.professional;
        else planDetails = {name: planName, price: total / (1+GST_RATE) };
        
        let discount = 0;
        let isPay1 = false;
        
        if (couponCode === 'NEXTOFF15' && planDetails.price) {
            discount = planDetails.price * 0.15;
        } else if (couponCode === 'PAY1') {
            isPay1 = true;
            if(planDetails.price){
              discount = planDetails.price - (1 / (1 + GST_RATE));
            }
        }


        const invoiceData: InvoiceData = {
            orderId: orderId,
            paymentId: paymentId,
            customer: {
                name: customerName,
                email: customerEmail,
            },
            plan: {
                name: planDetails.name,
                price: planDetails.price,
            },
            coupon: {
                code: couponCode,
                discount: discount,
                isPay1: isPay1
            },
            gst: gst,
            total: total,
        };

        generateInvoice(invoiceData);
        setIsInvoiceDownloaded(true);
        toast({
            title: "Invoice Downloaded",
            description: "You can now proceed to upload your data.",
        });
    };

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
                                    <h3 className="text-lg font-semibold">Step 1: Download Your Invoice (Required)</h3>
                                    <Button onClick={handleDownloadInvoice} size="lg">
                                        <Download className="mr-2 h-5 w-5" />
                                        Download Invoice
                                    </Button>
                                </div>

                                <div className="space-y-4 rounded-lg border bg-card p-4">
                                    <h3 className="text-lg font-semibold">Step 2: Upload Your Data</h3>
                                    <Button asChild size="lg" variant="secondary" disabled={!isInvoiceDownloaded}>
                                        <Link href="https://forms.gle/a8Yhowx9EutCwbcw7" target="_blank">
                                            {isInvoiceDownloaded ? <Unlock className="mr-2 h-5 w-5" /> : <Lock className="mr-2 h-5 w-5" />}
                                            Proceed to Data Upload Form
                                        </Link>
                                    </Button>
                                    {!isInvoiceDownloaded && (
                                        <p className="text-sm text-muted-foreground">
                                           Please download your invoice to unlock this step.
                                        </p>
                                    )}
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
