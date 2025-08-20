// app/api/createReview/route.ts
import { createClient } from '@sanity/client';
import { NextRequest, NextResponse } from 'next/server';

const client = createClient({
  // Use the new, dedicated server-side environment variable
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-08-20',
  token: process.env.SANITY_API_WRITE_TOKEN,
});

export async function POST(req: NextRequest) {
  try {
    const { authorName, quote, rating } = await req.json();

    await client.create({
      _type: 'testimonial',
      authorName: authorName,
      quote: quote,
      rating: rating,
      isApproved: false,
    });

    return NextResponse.json({ message: 'Review submitted successfully' }, { status: 200 });
  } catch (err) {
    console.error('Error submitting review:', err);
    return NextResponse.json({ message: 'Error submitting review' }, { status: 500 });
  }
}