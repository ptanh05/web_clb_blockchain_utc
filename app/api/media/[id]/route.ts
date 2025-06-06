import { NextRequest, NextResponse } from "next/server";
import { MediaService } from "../media.service";
import { MediaResponse, Media } from "../types";

// GET /api/media/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<MediaResponse>> {
  const { id } = params;
  console.log(`GET /api/media/${id} called`);

  if (!id) {
    return NextResponse.json(
      { 
        data: null,
        error: "Missing media ID", 
        details: "Media ID is required" 
      } as unknown as MediaResponse,
      { status: 400 }
    );
  }

  try {
    const media = await MediaService.getMediaById(parseInt(id));
    await MediaService.incrementViews(parseInt(id));
    return NextResponse.json({ data: media } as MediaResponse);
  } catch (error) {
    console.error(`Error in GET /api/media/${id}:`, error);
    return NextResponse.json(
      { 
        data: null,
        error: "Failed to fetch media item",
        details: error instanceof Error ? error.message : 'Unknown error occurred'
      } as unknown as MediaResponse,
      { status: 500 }
    );
  }
}

// PUT /api/media/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<MediaResponse>> {
  const { id } = params;
  console.log(`PUT /api/media/${id} called`);

  if (!id) {
    return NextResponse.json(
      { 
        data: null,
        error: "Missing media ID", 
        details: "Media ID is required" 
      } as unknown as MediaResponse,
      { status: 400 }
    );
  }

  try {
    const body = await request.json().catch(() => {
      throw new Error("Invalid JSON in request body");
    });

    const media = await MediaService.updateMedia(parseInt(id), body);
    return NextResponse.json({ data: media } as MediaResponse);
  } catch (error) {
    console.error(`Error in PUT /api/media/${id}:`, error);
    return NextResponse.json(
      { 
        data: null,
        error: "Failed to update media item",
        details: error instanceof Error ? error.message : 'Unknown error occurred'
      } as unknown as MediaResponse,
      { status: 500 }
    );
  }
}

// DELETE /api/media/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<{ success: boolean } | { error: string; details: string }>> {
  const { id } = params;
  console.log(`DELETE /api/media/${id} called`);

  if (!id) {
    return NextResponse.json(
      { error: "Missing media ID", details: "Media ID is required" },
      { status: 400 }
    );
  }

  try {
    await MediaService.deleteMedia(parseInt(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error in DELETE /api/media/${id}:`, error);
    return NextResponse.json(
      { 
        error: "Failed to delete media item",
        details: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}

// POST /api/media/[id]/download
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<{ success: boolean } | { error: string; details: string }>> {
  const { id } = params;
  console.log(`POST /api/media/${id}/download called`);

  if (!id) {
    return NextResponse.json(
      { error: "Missing media ID", details: "Media ID is required" },
      { status: 400 }
    );
  }

  try {
    await MediaService.incrementDownloads(parseInt(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error in POST /api/media/${id}/download:`, error);
    return NextResponse.json(
      { 
        error: "Failed to increment download count",
        details: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
} 