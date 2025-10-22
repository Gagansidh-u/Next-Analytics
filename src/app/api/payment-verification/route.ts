// /app/api/payment-verification/route.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_secret) {
    return NextResponse.json({ success: false, message: 'Razorpay key secret not configured.' }, { status: 500 });
  }

  const body = razorpay_order_id + '|' + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac('sha256', key_secret)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature === razorpay_signature) {
    // Payment is successful
    return NextResponse.json({ success: true, message: 'Payment verified successfully.' });
  } else {
    return NextResponse.json({ success: false, message: 'Payment verification failed.' }, { status: 400 });
  }
}

    