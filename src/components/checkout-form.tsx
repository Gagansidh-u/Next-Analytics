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
      if (isPay1Coupon) {
        setGst(0);
        setTotal(1);
      } else {
        const subtotalAfterDiscount = plan.price * (1 - discount);
        const gstAmount = subtotalAfterDiscount * GST_RATE;
        setGst(gstAmount);
        setTotal(subtotalAfterDiscount + gstAmount);
      }
    }
  }, [plan, discount, isPay1Coupon]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', coupon: '' },
  });

  const applyCoupon = useCallback(() => {
    const upperCaseCoupon = couponCode.toUpperCase();

    if (upperCaseCoupon === 'OFFNEXT15') {
      setDiscount(0.15);
      setIsPay1Coupon(false);
      toast({
        title: 'Coupon Applied!',
        description: 'You received a 15% discount.',
      });
    } else if (upperCaseCoupon === 'PAY1') {
      setDiscount(0);
      setIsPay1Coupon(true);
      toast({
        title: 'Coupon Applied!',
        description: 'You can now purchase this plan for just ₹1.',
      });
    } else {
      setDiscount(0);
      setIsPay1Coupon(false);
      toast({
        variant: 'destructive',
        title: 'Invalid Coupon',
        description: 'The coupon code you entered is not valid.',
      });
    }
  }, [couponCode, toast]);

  const createOrder = async (amount: number) => {
    try {
        const response = await fetch('/api/create-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: Math.round(amount * 100) }), // Amount in paise
        });
        if (!response.ok) {
            throw new Error('Failed to create order');
        }
        const order = await response.json();
        return order;
    } catch (error) {
        console.error('Order creation error:', error);
        toast({
            variant: 'destructive',
            title: 'Payment Error',
            description: 'Could not initiate payment. Please try again.',
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

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    if (!RAZORPAY_KEY) {
       toast({
        variant: 'destructive',
        title: 'Configuration Error',
        description: 'Razorpay Key ID is not configured. Please contact support.',
      });
      setIsLoading(false);
      return;
    }
    if ((!plan && !isPay1Coupon) || (total <= 0 && !isPay1Coupon) || !isRazorpayLoaded) {
      toast({
        variant: 'destructive',
        title: 'Payment Error',
        description: 'Could not process payment. Please ensure Razorpay is loaded and the total is correct.',
      });
      setIsLoading(false);
      return;
    }

    const order = await createOrder(total);

    if(!order) {
        setIsLoading(false);
        return;
    }

    const options = {
      key: RAZORPAY_KEY,
      amount: total * 100, // Amount in paise
      currency: 'INR',
      name: 'Next Analytics',
      description: `Payment for ${plan?.name}`,
      image: 'https://github.com/Gagansidh-u/My-Webapp/blob/master/Picsart_25-10-18_16-37-29-081.png?raw=true',
      order_id: order.id,
      handler: async function (response: any) {
        const verificationData = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };

        const result = await verifyPayment(verificationData);

        if (result.success) {
          toast({
            title: 'Payment Successful!',
            description: 'Thank you for your purchase. You will be redirected shortly.',
          });
          window.location.href = 'https://forms.gle/a8Yhowx9EutCwbcw7';
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
        coupon_applied: couponCode,
      },
      theme: {
        color: '#008080',
      },
    };
    
    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response: any) {
        toast({
            variant: 'destructive',
            title: 'Payment Failed',
            description: `Error: ${response.error.description}`,
        });
        setIsLoading(false);
    });
    rzp.open();
  };

  if (!plan) {
    return <div className="text-center"><Loader2 className="mx-auto h-12 w-12 animate-spin" /></div>;
  }

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
                <Button type="submit" className="w-full" disabled={isLoading || !isRazorpayLoaded}>
                  {isLoading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
                  ) : (
                    <><CreditCard className="mr-2 h-4 w-4" /> Pay ₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</>
                  )}
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
                <span>₹{plan.price.toLocaleString('en-IN')}</span>
                </div>
                
                {isPay1Coupon ? (
                  <div className="flex justify-between text-green-500">
                      <span>PAY1 Coupon</span>
                      <span>-₹{(plan.price + (plan.price * GST_RATE) - 1).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                ) : (
                  <>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-500">
                        <span>Discount ({(discount * 100).toFixed(0)}%)</span>
                        <span>-₹{(plan.price * discount).toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                        <span>GST (18%)</span>
                        <span>+₹{gst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  </>
                )}

                <div className="border-t pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
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
