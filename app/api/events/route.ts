import { NextRequest, NextResponse } from 'next/server';
import { EventService } from './events.service';
import { EventListResponse, EventResponse, Event } from './types';

export async function GET(request: NextRequest): Promise<NextResponse<EventListResponse>> {
  console.log('GET /api/events called');
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || undefined;
  const search = searchParams.get('search') || undefined;

  try {
    const events = await EventService.getAllEvents(category, search);
    return NextResponse.json({ data: events });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { 
        data: [], // Return empty array for data in case of error
        error: 'Failed to fetch events',
        details: error instanceof Error ? error.message : 'An unknown error occurred',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<EventResponse>> {
  console.log('POST /api/events called');
  try {
    const eventData: Partial<Event> = await request.json();

    // Basic validation
    if (!eventData.title || !eventData.date || !eventData.location || !eventData.category || !eventData.slug || !eventData.image || !eventData.excerpt) {
       return NextResponse.json(
        { data: null, error: 'Missing required fields', details: 'title, date, location, description, category, slug, image, excerpt are required.' },
        { status: 400 }
      );
    }

    // Call the service to create the event
    const newEvent = await EventService.createEvent(eventData);

    return NextResponse.json({ data: newEvent }, { status: 201 }); // 201 Created
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { 
        data: null,
        error: 'Failed to create event',
        details: error instanceof Error ? error.message : 'An unknown error occurred',
      },
      { status: 500 }
    );
  }
}

// Add other handlers (PUT, DELETE) if needed later
// export async function PUT(request: NextRequest): Promise<NextResponse<EventResponse>> { ... }
// export async function DELETE(request: NextRequest): Promise<NextResponse<{ success: boolean } | { error: string; details: string }>> { ... } 