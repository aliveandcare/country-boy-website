import { NextResponse } from 'next/server';
import formData from 'form-data';
import Mailgun from 'mailgun.js';

export async function POST(request: Request) {
  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({
    username: process.env.MAILGUN_USERNAME || 'api',
    key: process.env.MAILGUN_API_KEY || '',
  });

  try {
    const data = await request.formData();
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const phone = data.get('phone') as string;
    const description = data.get('description') as string;
    const attachment = data.get('attachment') as File;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const messageData: any = {
      from: `Quote Request <mailgun@${process.env.MAILGUN_DOMAIN}>`,
      to: [process.env.TO_EMAIL_ADDRESS || ''],
      subject: `New Quote Request from ${name}`,
      html: `
        <h3>New Project Quote Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <hr>
        <p><strong>Project Description:</strong></p>
        <p>${description}</p>
      `,
    };

    if (attachment && attachment.size > 0) {
      const attachmentBuffer = Buffer.from(await attachment.arrayBuffer());
      messageData.attachment = [
        {
          filename: attachment.name,
          data: attachmentBuffer,
        },
      ];
    }
    
    await mg.messages.create(process.env.MAILGUN_DOMAIN || '', messageData);

    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
  }
}