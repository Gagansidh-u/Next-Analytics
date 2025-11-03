// /app/api/cashfree-verification/route.ts
import { NextResponse } from 'next/server';
import { config } from 'dotenv';

config();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('order_id');

  if (!orderId) {
    return NextResponse.redirect(new URL('/checkout?status=failed', request.url));
  }

  if (!process.env.NEXT_PUBLIC_CASHFREE_APP_ID || !process.env.CASHFREE_SECRET_KEY) {
    return NextResponse.json({ error: 'Cashfree API keys not configured.' }, { status: 500 });
  }

  const url = `https://api.cashfree.com/pg/orders/${orderId}`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-api-version': '2023-08-01',
      'x-client-id': process.env.NEXT_PUBLIC_CASHFREE_APP_ID,
      'x-client-secret': process.env.CASHFREE_SECRET_KEY,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    
    if (data.order_status === 'PAID') {
      // Redirect to a success page with the order ID
      const successUrl = new URL(`/payment-success/${orderId}`, request.url)
      successUrl.searchParams.set('status', 'success');
      return NextResponse.redirect(successUrl);

    } else {
      // Redirect to a failure page
       const failureUrl = new URL(`/checkout`, request.url);
       failureUrl.searchParams.set('status', 'failed');
       failureUrl.searchParams.set('reason', data.order_status);
       return NextResponse.redirect(failureUrl);
    }
  } catch (error) {
    console.error('Cashfree verification error:', error);
    const failureUrl = new URL(`/checkout`, request.url);
    failureUrl.searchParams.set('status', 'error');
    return NextResponse.redirect(failureUrl);
  }
}
