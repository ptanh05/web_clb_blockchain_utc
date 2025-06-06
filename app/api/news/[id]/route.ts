import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { NewsArticleResponse } from "../types";
import { convertDBNewsArticleToNewsArticle, convertNewsArticleToDBNewsArticle, validateNewsArticle } from "../utils";

// GET /api/news/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<NewsArticleResponse>> {
  const { id } = params;
  console.log(`GET /api/news/${id} called`);

  if (!id) {
    return NextResponse.json(
      { error: "Missing news ID", details: "News ID is required" },
      { status: 400 }
    );
  }

  try {
    if (!process.env.POSTGRES_URL) {
      throw new Error("Database connection string is not configured");
    }

    const result = await sql.query('SELECT * FROM news WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "News article not found", details: `No article found with ID ${id}` },
        { status: 404 }
      );
    }

    const newsArticle = convertDBNewsArticleToNewsArticle(result.rows[0]);
    return NextResponse.json({ data: newsArticle });

  } catch (error) {
    console.error(`Error in GET /api/news/${id}:`, error);
    return NextResponse.json(
      { 
        error: "Failed to fetch news article",
        details: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}

// PUT /api/news/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<NewsArticleResponse>> {
  const { id } = params;
  console.log(`PUT /api/news/${id} called`);

  if (!id) {
    return NextResponse.json(
      { error: "Missing news ID", details: "News ID is required" },
      { status: 400 }
    );
  }

  try {
    if (!process.env.POSTGRES_URL) {
      throw new Error("Database connection string is not configured");
    }

    const body = await request.json().catch(() => {
      throw new Error("Invalid JSON in request body");
    });

    // Validate required fields
    const validationErrors = validateNewsArticle(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { 
          error: "Validation failed",
          details: validationErrors.join(", ")
        },
        { status: 400 }
      );
    }

    const dbArticle = convertNewsArticleToDBNewsArticle(body);
    const fields = Object.keys(dbArticle).filter(
      key => dbArticle[key as keyof typeof dbArticle] !== undefined
    );

    if (fields.length === 0) {
      return NextResponse.json(
        { error: "No valid fields provided for update", details: "At least one field must be provided" },
        { status: 400 }
      );
    }

    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(", ");
    const query = `UPDATE news SET ${setClause} WHERE id = $1 RETURNING *`;
    const values = [id, ...fields.map(field => dbArticle[field as keyof typeof dbArticle])];

    const result = await sql.query(query, values);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "News article not found", details: `No article found with ID ${id}` },
        { status: 404 }
      );
    }

    const updatedArticle = convertDBNewsArticleToNewsArticle(result.rows[0]);
    return NextResponse.json({ data: updatedArticle });

  } catch (error) {
    console.error(`Error in PUT /api/news/${id}:`, error);
    return NextResponse.json(
      { 
        error: "Failed to update news article",
        details: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}

// DELETE /api/news/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<{ success: boolean } | { error: string; details: string }>> {
  const { id } = params;
  console.log(`DELETE /api/news/${id} called`);

  if (!id) {
    return NextResponse.json(
      { error: "Missing news ID", details: "News ID is required" },
      { status: 400 }
    );
  }

  try {
    if (!process.env.POSTGRES_URL) {
      throw new Error("Database connection string is not configured");
    }

    const result = await sql.query('DELETE FROM news WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "News article not found", details: `No article found with ID ${id}` },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(`Error in DELETE /api/news/${id}:`, error);
    return NextResponse.json(
      { 
        error: "Failed to delete news article",
        details: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
} 