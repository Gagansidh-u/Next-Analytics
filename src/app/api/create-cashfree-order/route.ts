// /app/api/create-cashfree-order/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { amount, customer } = await request.json();
  const order_id = `order_${Date.now()}`;

  if (!process.env.NEXT_PUBLIC_CASHFREE_APP_ID || !process.env.CASHFREE_SECRET_KEY) {
    return NextResponse.json({ error: 'Cashfree API keys not configured.' }, { status: 500 });
  }

  const url = 'https://api.cashfree.com/pg/orders';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-version': '2023-08-01',
      'x-client-id': process.env.NEXT_PUBLIC_CASHFREE_APP_ID,
      'x-client-secret': process.env.CASHFREE_SECRET_KEY,
    },
    body: JSON.stringify({
      order_id,
      order_amount: amount,
      order_currency: 'INR',
      customer_details: {
        customer_id: `customer_${Date.now()}`,
        customer_email: customer.email,
        customer_phone: '9999999999', // Cashfree requires a phone number
        customer_name: customer.name,
      },
      order_meta: {
        return_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002'}/api/cashfree-verification?order_id={order_id}`,
      },
    }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(data);
    } else {
      console.error('Cashfree API Error:', data);
      return NextResponse.json({ error: data.message || 'Could not create Cashfree order.' }, { status: response.status });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Could not create Cashfree order.' }, { status: 500 });
  }
}
