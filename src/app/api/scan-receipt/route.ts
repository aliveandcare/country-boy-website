import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const image = data.get('image') as File;

    if (!image) {
      return NextResponse.json({ error: 'No image provided.' }, { status: 400 });
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    const base64Image = buffer.toString('base64');

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Analyze this receipt image. Extract the vendor name, the final total amount (as a number), and categorize the expense into one of the following: "Materials", "Fuel", "Tools", or "Other". Respond with ONLY a valid JSON object in the format: { "vendor": "string", "total": "number", "category": "string" }' },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 300,
    });
    
    const content = response.choices[0].message.content;
    const jsonResponse = JSON.parse(content || '{}');

    return NextResponse.json(jsonResponse, { status: 200 });

  } catch (error: unknown) {
    console.error('--- DETAILED SERVER ERROR ---');
    console.error(error);

    let errorMessage = 'Failed to scan receipt due to an unknown error.';
    
    if (error instanceof Error) {
      if ('status' in error && typeof error.status === 'number') {
        if (error.status === 401) {
          errorMessage = 'Authentication Error: Your OpenAI API Key is invalid or has been revoked.';
        } else if (error.status === 429) {
          errorMessage = 'OpenAI Quota Exceeded. Please check your billing details and usage limits in your OpenAI account.';
        }
      }
      if (error.message) {
        errorMessage = error.message;
      }
    }
    
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}