
import { NextRequest, NextResponse } from 'next/server';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import formData from 'form-data';
import Mailgun from 'mailgun.js';

const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET!;

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get(SIGNATURE_HEADER_NAME)!;
    const body = await req.text();
    if (!isValidSignature(body, signature, SANITY_WEBHOOK_SECRET)) {
      return new NextResponse('Invalid signature', { status: 401 });
    }

    const { authorName, quote, rating } = JSON.parse(body);

    await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
      from: "New Review Bot <noreply@yourdomain.com>", 
      to: [process.env.TO_EMAIL_ADDRESS!],
      subject: `New Review from ${authorName}!`,
      text: `A new review has been submitted and is ready for your approval.

Author: ${authorName}
Rating: ${rating} / 5
Review:
"${quote}"

Approve it here: https://countryboy.sanity.studio/desk/testimonial`,
    });

    return new NextResponse('Email sent', { status: 200 });
  } catch (err) {
    console.error('Error in notify-review webhook:', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}