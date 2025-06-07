import { NextRequest, NextResponse } from "next/server";
import { MediaService } from "./media.service";
import { MediaListResponse, MediaResponse } from "./types";

// GET /api/media
export async function GET(request: NextRequest): Promise<NextResponse<MediaListResponse>> {
  console.log('GET /api/media called');
  
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "all";
  const category = searchParams.get("category") || "all";
  const search = searchParams.get("search") || "";
  
  try {
    const media = await MediaService.getAllMedia(type, category, search);
    return NextResponse.json({ data: media });
  } catch (error) {
    console.error("Error in GET /api/media:", error);
    return NextResponse.json(
      { 
        data: [],
        error: "Failed to fetch media items", 
        details: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}

// POST /api/media
export async function POST(request: NextRequest): Promise<NextResponse<MediaResponse>> {
  console.log('POST /api/media called');
  
  try {
    const body = await request.json().catch(() => {
      throw new Error("Invalid JSON in request body");
    });

    const media = await MediaService.addMedia(body);
    return NextResponse.json({ data: media }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/media:", error);
    return NextResponse.json(
      { 
        data: null,
        error: "Failed to create media item",
        details: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
} 