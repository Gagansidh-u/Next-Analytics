// @/components/checkout-form.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Ticket, CreditCard } from 'lucide-react';
import Script from 'next/script';
import { generateInvoice, InvoiceData } from '@/lib/invoice';


const plans = {
  basic: { name: 'Basic Plan', price: 5000 },
  professional: { name: 'Professional Plan', price: 12000 },
  enterprise: { name: 'Enterprise Plan', price: 0 }, // Custom price, handle separately
};

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  coupon: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const RAZORPAY_KEY = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
const GST_RATE = 0.18;

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function CheckoutForm() {
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
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);


  useEffect(() => {
    const selectedPlanId = searchParams.get('plan') as keyof typeof plans;
    if (selectedPlanId && plans[selectedPlanId]) {
      setPlanId(selectedPlanId);
      setPlan(plans[selectedPlanId]);
    } else {
      router.push('/#pricing');
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
      setTotal(finalTotal);
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

  const createOrder = async (amount: number) => {
    try {
        const response = await fetch('/api/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: Math.round(amount * 100) }), // Amount in paise
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

  const verifyPayment = async (data: any) => {
    try {
      const response = await fetch('/api/payment-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error('Payment verification error:', error);
      return { success: false, message: 'Could not verify payment.' };
    }
  };

  const handleSuccessfulOrder = useCallback(async (
    formData: FormValues,
    paymentDetails: { orderId: string; paymentId: string }
  ) => {
    if (!plan) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'A processing error occurred. Please contact support.',
      });
      setIsLoading(false);
      return;
    }
    
    try {
      let discountAmount = 0;
      if (isFreeCoupon) {
          discountAmount = plan.price;
      } else if (isPay1Coupon) {
          discountAmount = plan.price + (plan.price * GST_RATE) - 1;
      } else {
          discountAmount = plan.price * discount;
      }

      const newInvoiceData: InvoiceData = {
        orderId: paymentDetails.orderId,
        paymentId: paymentDetails.paymentId,
        customer: {
          name: formData.name,
          email: formData.email,
        },
        plan: {
          name: plan.name,
          price: plan.price,
        },
        coupon: {
          code: couponCode.toUpperCase(),
          discount: discountAmount,
          isPay1: isPay1Coupon,
        },
        gst,
        total,
      };
      
      generateInvoice(newInvoiceData);
      window.location.href = 'https://forms.gle/a8Yhowx9EutCwbcw7';

    } catch (error) {
      console.error('Error in post-payment processing:', error);
      toast({
        variant: 'destructive',
        title: 'Post-Payment Error',
        description: 'Your payment was successful, but we failed to generate your invoice. Please contact support.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [plan, isFreeCoupon, isPay1Coupon, discount, couponCode, gst, total, toast]);


  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);

    if (isFreeCoupon) {
      await handleSuccessfulOrder(data, {
        orderId: `FREE-${Date.now()}`,
        paymentId: `FREE-${Date.now()}`,
      });
      return;
    }

    if (!plan || !RAZORPAY_KEY || !isRazorpayLoaded) {
        toast({ variant: 'destructive', title: 'Error', description: 'Payment gateway is not ready. Please try again in a moment.' });
        setIsLoading(false);
        return;
    }

    const order = await createOrder(total);
    if (!order) {
        setIsLoading(false);
        return;
    }

    const options = {
      key: RAZORPAY_KEY,
      amount: order.amount,
      currency: order.currency,
      name: 'Next Analytics',
      description: `Payment for ${plan.name}`,
      image: 'https://github.com/Gagansidh-u/My-Webapp/blob/master/Picsart_25-10-18_16-37-29-081.png?raw=true',
      order_id: order.id,
      handler: async (response: any) => {
        const verificationData = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };

        const result = await verifyPayment(verificationData);

        if (result.success) {
          await handleSuccessfulOrder(data, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
          });
        } else {
          toast({
            variant: 'destructive',
            title: 'Payment Verification Failed',
            description: result.message || 'Please contact support.',
          });
          setIsLoading(false);
        }
      },
      prefill: {
        name: data.name,
        email: data.email,
      },
      notes: {
        plan: planId,
        coupon_applied: couponCode.toUpperCase(),
      },
      theme: {
        color: '#008080',
      },
    };
    
    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', (response: any) => {
        toast({
            variant: 'destructive',
            title: 'Payment Failed',
            description: `Error: ${response.error.code} - ${response.error.description}`,
        });
        setIsLoading(false);
    });

    rzp.open();
  };

  if (!plan) {
    return <div className="text-center"><Loader2 className="mx-auto h-12 w-12 animate-spin" /></div>;
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
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setIsRazorpayLoaded(true)}
      />

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
                <Button type="submit" className="w-full" disabled={isLoading || (!isRazorpayLoaded && !isFreeCoupon)}>
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
                <span>{plan.name}</span>
                <span>₹{plan.price.toFixed(2)}</span>
                </div>
                
                {isFreeCoupon ? (
                  <div className="flex justify-between text-green-500">
                    <span>100% Discount ("25072005")</span>
                    <span>-₹{plan.price.toFixed(2)}</span>
                  </div>
                ) : isPay1Coupon ? (
                  <div className="flex justify-between text-green-500">
                      <span>PAY1 Coupon</span>
                      <span>-₹{(plan.price * (1+GST_RATE) - 1).toFixed(2)}</span>
                  </div>
                ) : (
                  <>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-500">
                        <span>Discount ({(discount * 100).toFixed(0)}%)</span>
                        <span>-₹{(plan.price * discount).toFixed(2)}</span>
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
