// @/components/checkout-form.tsx
'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Ticket, CreditCard, AlertTriangle } from 'lucide-react';
import { load, Cashfree } from '@cashfreepayments/cashfree-js';

const plans = {
  basic: { name: 'Basic Plan', price: 5000 },
  professional: { name: 'Professional Plan', price: 12000 },
  enterprise: { name: 'Enterprise Plan', price: 0 },
};

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  coupon: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const GST_RATE = 0.18;

function CheckoutFormComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [planId, setPlanId] = useState<keyof typeof plans | null>(null);
  const [plan, setPlan] = useState<{ name: string; price: number } | null>(null);
  const [discount, setDiscount] = useState(0);
  const [isPay1Coupon, setIsPay1Coupon] = useState(false);
  const [isFreeCoupon, setIsFreeCoupon] = useState(false);
  const [gst, setGst] = useState(0);
  const [total, setTotal] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cashfree, setCashfree] = useState<Cashfree | null>(null);

   useEffect(() => {
    const status = searchParams.get('status');
    const reason = searchParams.get('reason');
    if (status === 'failed') {
      toast({
        variant: 'destructive',
        title: 'Payment Failed',
        description: `Your payment could not be processed. Reason: ${reason || 'Unknown'}. Please try again.`,
      });
    } else if (status === 'error') {
       toast({
        variant: 'destructive',
        title: 'Payment Error',
        description: 'An unexpected error occurred during payment verification. Please contact support.',
      });
    }
  }, [searchParams, toast]);

  useEffect(() => {
    const initializeCashfree = async () => {
      try {
        const cfInstance = await load({ mode: 'production' });
        setCashfree(cfInstance);
      } catch (error) {
        console.error('Failed to initialize Cashfree:', error);
        toast({
          variant: 'destructive',
          title: 'Payment Gateway Error',
          description: 'Could not load the payment gateway. Please refresh the page.',
        });
      }
    };
    initializeCashfree();
  }, [toast]);

  useEffect(() => {
    const selectedPlanId = searchParams.get('plan') as keyof typeof plans;
    if (selectedPlanId && plans[selectedPlanId]) {
      setPlanId(selectedPlanId);
      setPlan(plans[selectedPlanId]);
    } else {
      if (!searchParams.has('status')) { // Avoid redirecting if it's a verification redirect
        router.push('/#pricing');
      }
    }
  }, [searchParams, router]);

  useEffect(() => {
    if (plan) {
      let subtotal = plan.price;
      
      if(isFreeCoupon) {
        subtotal = 0;
      } else if (isPay1Coupon) {
        subtotal = 1 / (1 + GST_RATE);
      } else {
        subtotal = plan.price * (1 - discount);
      }
      
      let gstAmount = isFreeCoupon ? 0 : subtotal * GST_RATE;
      let finalTotal = isPay1Coupon ? 1 : subtotal + gstAmount;

      if(isFreeCoupon){
        finalTotal = 0;
      }

      setGst(gstAmount);
      setTotal(parseFloat(finalTotal.toFixed(2)));
    }
  }, [plan, discount, isPay1Coupon, isFreeCoupon]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', coupon: '' },
  });

  const applyCoupon = useCallback(() => {
    const upperCaseCoupon = couponCode.toUpperCase();
    form.setValue('coupon', upperCaseCoupon);

    if (upperCaseCoupon === 'OFFNEXT15') {
      setDiscount(0.15);
      setIsPay1Coupon(false);
      setIsFreeCoupon(false);
      toast({
        title: 'Coupon Applied!',
        description: 'You received a 15% discount.',
      });
    } else if (upperCaseCoupon === 'PAY1') {
      setDiscount(0);
      setIsPay1Coupon(true);
      setIsFreeCoupon(false);
      toast({
        title: 'Coupon Applied!',
        description: 'You can now purchase this plan for just ₹1.',
      });
    } else if (upperCaseCoupon === '25072005') {
      setDiscount(0);
      setIsPay1Coupon(false);
      setIsFreeCoupon(true);
      toast({
        title: 'Coupon Applied!',
        description: 'You get 100% off. This purchase is free!',
      });
    } else {
      setDiscount(0);
      setIsPay1Coupon(false);
      setIsFreeCoupon(false);
      if (couponCode) {
        toast({
          variant: 'destructive',
          title: 'Invalid Coupon',
          description: 'The coupon code you entered is not valid.',
        });
      }
    }
  }, [couponCode, toast, form]);

  const createOrder = async (amount: number, customer: {name: string, email: string}) => {
    try {
        const response = await fetch('/api/create-cashfree-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount, customer }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to create order');
        }

        return await response.json();
    } catch (error) {
        console.error('Order creation error:', error);
        toast({
            variant: 'destructive',
            title: 'Payment Error',
            description: error instanceof Error ? error.message : 'Could not initiate payment. Please try again.',
        });
        return null;
    }
  }
  
  const handleFreeOrder = (data: FormValues) => {
    const orderId = `FREE-${Date.now()}`;
    router.push(`/payment-success/${orderId}?status=success`);
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);

    if (isFreeCoupon) {
      handleFreeOrder(data);
      return;
    }
  
    if (!plan || !cashfree) {
      toast({ variant: 'destructive', title: 'Error', description: 'Payment gateway is not ready. Please try again in a moment.' });
      setIsLoading(false);
      return;
    }

    const order = await createOrder(total, data);
    if (!order || !order.payment_session_id) {
      setIsLoading(false);
      return;
    }

    const sessionId = order.payment_session_id;
    
    cashfree.checkout({
      paymentSessionId: sessionId,
      redirectTarget: '_self'
    });
  };

  if (!plan && !searchParams.has('status')) {
    return <div className="text-center"><Loader2 className="mx-auto h-12 w-12 animate-spin" /></div>;
  }
  
  // A simple way to hide the form if a payment status is present, showing only the toast
  if (searchParams.has('status')) {
    return (
        <div className="flex justify-center items-center h-64">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Processing Payment</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p>Please wait while we verify your payment status...</p>
                    <Loader2 className="mx-auto h-8 w-8 animate-spin mt-4" />
                </CardContent>
            </Card>
        </div>
    );
  }


  const getButtonText = () => {
    if (isLoading) {
      return <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>;
    }
    if (isFreeCoupon) {
      return 'Get for Free';
    }
    return <><CreditCard className="mr-2 h-4 w-4" /> Pay ₹{total.toFixed(2)}</>;
  };

  return (
    <>
      <div className="grid gap-10 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
            <CardDescription>Fill in your details to complete the purchase.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading || (!cashfree && !isFreeCoupon)}>
                  {getButtonText()}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-6">
            <Card>
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between">
                <span>{plan?.name || 'Loading...'}</span>
                <span>₹{plan?.price.toFixed(2) || '0.00'}</span>
                </div>
                
                {isFreeCoupon ? (
                  <div className="flex justify-between text-green-500">
                    <span>100% Discount ("25072005")</span>
                    <span>-₹{plan?.price.toFixed(2)}</span>
                  </div>
                ) : isPay1Coupon ? (
                  <div className="flex justify-between text-green-500">
                      <span>PAY1 Coupon</span>
                      <span>-₹{(plan ? (plan.price * (1+GST_RATE) - 1) : 0).toFixed(2)}</span>
                  </div>
                ) : (
                  <>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-500">
                        <span>Discount ({(discount * 100).toFixed(0)}%)</span>
                        <span>-₹{(plan ? (plan.price * discount) : 0).toFixed(2)}</span>
                      </div>
                    )}
                  </>
                )}
                 {!isFreeCoupon && !isPay1Coupon && (
                    <div className="flex justify-between">
                        <span>GST (18%)</span>
                        <span>+₹{gst.toFixed(2)}</span>
                    </div>
                )}
                <div className="border-t pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
                </div>
            </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Have a coupon?</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex space-x-2">
                        <Input 
                            placeholder="Enter coupon code" 
                            value={couponCode} 
                            onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <Button onClick={applyCoupon}><Ticket className="mr-2 h-4 w-4" /> Apply</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </>
  );
}

export default function CheckoutForm() {
    return (
        <Suspense fallback={<div className="text-center"><Loader2 className="mx-auto h-12 w-12 animate-spin" /></div>}>
            <CheckoutFormComponent />
        </Suspense>
    );
}
