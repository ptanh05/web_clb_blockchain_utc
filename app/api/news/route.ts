import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { NewsArticle, NewsArticleResponse, NewsArticlesResponse } from "./types";
import {
  convertDBNewsArticleToNewsArticle,
  convertNewsArticleToDBNewsArticle,
  validateNewsArticle,
  buildNewsQuery,
} from "./utils";

// GET /api/news
export async function GET(request: NextRequest): Promise<NextResponse<NewsArticlesResponse>> {
  console.log('GET /api/news called');
  
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "all";
  const search = searchParams.get("search") || "";
  
  try {
    if (!process.env.POSTGRES_URL) {
      throw new Error("Database connection string is not configured");
    }

    const { query, params } = buildNewsQuery(category, search);
    console.log('Executing query:', { query, params });

    const result = await sql.query(query, params);
    const newsArticles = result.rows.map(convertDBNewsArticleToNewsArticle);

    return NextResponse.json({ data: newsArticles });
  } catch (error) {
    console.error("Error in GET /api/news:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch news articles", 
        details: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}

// POST /api/news
export async function POST(request: NextRequest): Promise<NextResponse<NewsArticleResponse>> {
  console.log('POST /api/news called');
  
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

    const result = await sql.query(
      `INSERT INTO news (
        title, slug, date, time, image, excerpt, content, category, tags, 
        author_name, author_role, author_image, readTime, views, likes, comments
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *`,
      [
        dbArticle.title, dbArticle.slug, dbArticle.date, dbArticle.time, dbArticle.image, 
        dbArticle.excerpt, dbArticle.content, dbArticle.category, dbArticle.tags,
        dbArticle.author_name, dbArticle.author_role, dbArticle.author_image,
        dbArticle.readTime, dbArticle.views, dbArticle.likes, dbArticle.comments
      ]
    );

    if (result.rows.length === 0) {
      throw new Error("Failed to insert news article");
    }

    const newArticle = convertDBNewsArticleToNewsArticle(result.rows[0]);
    return NextResponse.json({ data: newArticle }, { status: 201 });

  } catch (error) {
    console.error("Error in POST /api/news:", error);
    return NextResponse.json(
      { 
        error: "Failed to create news article",
        details: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
} 