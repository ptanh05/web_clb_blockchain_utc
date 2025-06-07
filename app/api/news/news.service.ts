import { NewsArticle, NewsArticleDB } from "./types";
import pool from "@/app/api/db"; // Assuming pool is the default export
import { parseStringArray } from "./types"; // Import parseStringArray from types

// Helper function to convert DB row to NewsArticle
function convertDBNewsArticleToNewsArticle(row: NewsArticleDB): NewsArticle {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category,
    image: row.image || '', // Ensure image is string
    content: row.content,
    date: row.date, // Assuming date is string from DB
    time: row.time || undefined, // time is optional string in NewsArticle
    excerpt: row.excerpt || '', // Ensure excerpt is string
    readTime: row.readTime || 0, // Ensure readTime is number
    likes: row.likes || 0, // Ensure likes is number
    comments: row.comments || 0, // Ensure comments is number
    author: {
      name: row.author_name || '',
      role: row.author_role || '',
      image: row.author_image || '',
    }, // Assuming author maps to separate DB columns
    tags: parseStringArray(row.tags), // Use parseStringArray for tags
    views: row.views || 0, // Ensure views is number
    created_at: new Date(row.created_at as string).toISOString(), // Cast to string for Date constructor
    updated_at: new Date(row.updated_at as string).toISOString(), // Cast to string for Date constructor
  };
}

export class NewsService {
  // Lấy tất cả tin tức (có hỗ trợ filter và search)
  static async getAllNews(category: string | "all" = "all", search: string = ""): Promise<NewsArticle[]> {
    console.log('NewsService.getAllNews called with:', { category, search });

    let query = 'SELECT * FROM news';
    const params: (string | number)[] = [];
    const conditions: string[] = [];
    let paramIndex = 1;

    if (category !== "all") {
      conditions.push('category = $' + paramIndex++);
      params.push(category);
    }

    if (search) {
      conditions.push(
        `(title ILIKE $' + paramIndex + ' OR content ILIKE $' + (paramIndex + 1) + ')`
      );
      params.push(`%${search}%`);
      params.push(`%${search}%`);
      paramIndex += 2;
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY created_at DESC';

    try {
      const result = await pool.query(query, params);
      console.log('News DB Query Result (partial):', result.rows.slice(0, 5));
      return result.rows.map(convertDBNewsArticleToNewsArticle);
    } catch (error) {
      console.error("Error in NewsService.getAllNews:", error);
      throw error;
    }
  }

  // Lấy tin tức theo ID
  static async getNewsById(id: number): Promise<NewsArticle | null> {
    console.log(`NewsService.getNewsById called with ID: ${id}`);

    const query = 'SELECT * FROM news WHERE id = $1 LIMIT 1';
    const params = [id];

    try {
      const result = await pool.query(query, params);
      console.log('News DB Query Result:', result.rows[0]);

      if (result.rows.length > 0) {
        return convertDBNewsArticleToNewsArticle(result.rows[0]);
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error in NewsService.getNewsById:", error);
      throw error;
    }
  }

  // Lấy tin tức theo Slug
  static async getNewsBySlug(slug: string): Promise<NewsArticle | null> {
    console.log(`NewsService.getNewsBySlug called with slug: ${slug}`);

    const query = 'SELECT * FROM news WHERE slug = $1 LIMIT 1';
    const params = [slug];

    try {
      const result = await pool.query(query, params);
      console.log('News DB Query Result:', result.rows[0]);

      if (result.rows.length > 0) {
        return convertDBNewsArticleToNewsArticle(result.rows[0]);
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error in NewsService.getNewsBySlug:", error);
      throw error;
    }
  }
}