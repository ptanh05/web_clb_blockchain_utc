import { NextRequest, NextResponse } from 'next/server';
import { EventService } from '../events.service';
import type { EventResponse } from '../types';
import type { ErrorResponse } from '../types';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<EventResponse>> {
  const { id } = params;
  try {
    const event = await EventService.getEventById(Number(id));
    if (!event) {
      return NextResponse.json(
        { data: null, error: 'Event not found', details: `No event with id ${id}` },
        { status: 404 }
      );
    }
    return NextResponse.json({ data: event });
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        error: 'Failed to fetch event',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
} 

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<{ views: number } | ErrorResponse>> {
  const { id } = params;
  try {
    const newViews = await EventService.incrementViews(Number(id));
    return NextResponse.json({ views: newViews });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to increment views', details: message }, { status: 500 });
  }
}