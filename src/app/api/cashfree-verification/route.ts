// /app/api/cashfree-verification/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('order_id');
  const coupon = searchParams.get('coupon');

  if (!orderId) {
    return NextResponse.redirect(new URL('/checkout?status=failed&reason=no_order_id', process.env.NEXT_PUBLIC_SITE_URL));
  }

  if (!process.env.CASHFREE_APP_ID || !process.env.CASHFREE_SECRET_KEY) {
    console.error('Cashfree API keys not configured on the server.');
    return NextResponse.redirect(new URL('/checkout?status=error&reason=server_config_error', process.env.NEXT_PUBLIC_SITE_URL));
  }

  const url = `https://api.cashfree.com/pg/orders/${orderId}`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-api-version': '2023-08-01',
      'x-client-id': process.env.CASHFREE_APP_ID,
      'x-client-secret': process.env.CASHFREE_SECRET_KEY,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    
    if (data.order_status === 'PAID') {
      const customerName = data.customer_details?.customer_name || '';
      const successUrl = new URL(`/payment-success/${orderId}`, process.env.NEXT_PUBLIC_SITE_URL);
      successUrl.searchParams.set('status', 'success');
      successUrl.searchParams.set('name', customerName);
      successUrl.searchParams.set('email', data.customer_details?.customer_email);
      successUrl.searchParams.set('planName', 'Your Plan'); // You may need a better way to get this
      successUrl.searchParams.set('total', data.order_amount);
      successUrl.searchParams.set('paymentId', data.cf_order_id);
      if (coupon) {
        successUrl.searchParams.set('coupon', coupon);
      }
      
      return NextResponse.redirect(successUrl);

    } else {
       const failureUrl = new URL(`/checkout`, process.env.NEXT_PUBLIC_SITE_URL);
       failureUrl.searchParams.set('status', 'failed');
       failureUrl.searchParams.set('reason', data.order_status || 'payment_not_paid');
       return NextResponse.redirect(failureUrl);
    }
  } catch (error) {
    console.error('Cashfree verification error:', error);
    const failureUrl = new URL(`/checkout`, process.env.NEXT_PUBLIC_SITE_URL);
    failureUrl.searchParams.set('status', 'error');
    failureUrl.searchParams.set('reason', 'verification_failed');
    return NextResponse.redirect(failureUrl);
  }
}
