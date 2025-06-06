import { NextResponse } from 'next/server';
import type { ContactFormData, ContactSuccessResponse, ContactErrorResponse } from './types';
import { ContactService } from './contact.service';

export async function POST(req: Request): Promise<NextResponse<ContactSuccessResponse | ContactErrorResponse>> {
  try {
    const data: ContactFormData = await req.json();

    // Basic validation
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    // You might want more robust email validation here

    const newContactMessage = await ContactService.createContactMessage(data);
    
    // Optionally return the created message or just a success indicator
    return NextResponse.json({ message: 'Contact message received successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Error processing contact form submission:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 