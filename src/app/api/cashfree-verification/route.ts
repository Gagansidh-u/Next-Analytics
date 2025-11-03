// /app/api/cashfree-verification/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('order_id');

  if (!orderId) {
    return NextResponse.redirect(new URL('/checkout?status=failed&reason=no_order_id', request.url));
  }

  if (!process.env.CASHFREE_APP_ID || !process.env.CASHFREE_SECRET_KEY) {
    console.error('Cashfree API keys not configured on the server.');
    return NextResponse.redirect(new URL('/checkout?status=error&reason=server_config_error', request.url));
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
      // Redirect to a success page with the order ID
      const successUrl = new URL(`/payment-success/${orderId}`, request.url)
      successUrl.searchParams.set('status', 'success');
      return NextResponse.redirect(successUrl);

    } else {
      // Redirect to a failure page
       const failureUrl = new URL(`/checkout`, request.url);
       failureUrl.searchParams.set('status', 'failed');
       failureUrl.searchParams.set('reason', data.order_status || 'payment_not_paid');
       return NextResponse.redirect(failureUrl);
    }
  } catch (error) {
    console.error('Cashfree verification error:', error);
    const failureUrl = new URL(`/checkout`, request.url);
    failureUrl.searchParams.set('status', 'error');
    failureUrl.searchParams.set('reason', 'verification_failed');
    return NextResponse.redirect(failureUrl);
  }
}
