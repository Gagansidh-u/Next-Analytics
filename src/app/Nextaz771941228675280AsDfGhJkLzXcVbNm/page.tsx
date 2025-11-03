
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, UploadCloud } from 'lucide-react';
import Link from 'next/link';

function SuccessContent() {
    const searchParams = useSearchParams();
    const name = searchParams.get('name') || 'Valued Customer';

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 flex items-center justify-center bg-background">
                <div className="container py-12 md:py-20">
                    <Card className="mx-auto max-w-lg">
                        <CardHeader className="text-center">
                            <CardTitle>Payment Successful!</CardTitle>
                            <CardDescription>Your order is complete. Please proceed to the next step.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center p-4 md:p-8 space-y-6">
                                <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                                <p className="text-lg text-foreground/80">
                                    Thank you for your purchase, {name}!
                                </p>
                                <div className="space-y-4 rounded-lg border bg-card p-4">
                                    <h3 className="text-lg font-semibold">Next Step: Upload Your Data</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Click the button below to securely submit your data for analysis.
                                    </p>
                                    <Button asChild size="lg">
                                        <Link href="https://forms.gle/a8Yhowx9EutCwbcw7" target="_blank">
                                            <UploadCloud className="mr-2 h-5 w-5" />
                                            Proceed to Data Upload Form
                                        </Link>
                                    </Button>
                                     <p className="text-sm text-muted-foreground pt-2">
                                        Lost this link later? <Link href="/lost-form" className="underline">Recover it here</Link>.
                                    </p>
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
        <Suspense fallback={<div>Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
