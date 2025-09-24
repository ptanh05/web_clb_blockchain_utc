import { NextResponse, NextRequest } from 'next/server';
import { NewsService } from './news.service';

// Ensure this route is always treated as dynamic on platforms like Vercel
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Use nextUrl to avoid static rendering issues
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category') || 'all';
    const search = searchParams.get('search') || '';

    const news = await NewsService.getAllNews(category, search);
    return NextResponse.json({ data: news });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}
