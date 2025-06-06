import { NewsArticle, NewsArticleResponse, NewsArticlesResponse } from "./types";

const API_URL = "/api/news";

export class NewsService {
  // Lấy tất cả tin tức (có hỗ trợ filter và search)
  static async getAllNews(category: string | "all" = "all", search: string = ""): Promise<NewsArticle[]> {
    console.log('NewsService.getAllNews called with:', { category, search });

    try {
      const queryParams = new URLSearchParams();
      if (category !== "all") {
        queryParams.append("category", category);
      }
      if (search) {
        queryParams.append("search", search);
      }

      const url = `${API_URL}?${queryParams.toString()}`;
      console.log('Fetching news from URL:', url);

      const response = await fetch(url);
      console.log('News API Response status:', response.status);

      const result: NewsArticlesResponse = await response.json();
      console.log('News API Response data (partial):', result?.data?.slice(0, 5)); // Log first 5 items

      if (!response.ok) {
        console.error('News API Error:', result);
        throw new Error(result.details || result.error || "Failed to fetch news articles");
      }

      return result.data || [];
    } catch (error) {
      console.error("Error in NewsService.getAllNews:", error);
      throw error;
    }
  }

  // Lấy tin tức theo ID
  static async getNewsById(id: number): Promise<NewsArticle | null> {
    console.log(`NewsService.getNewsById called with ID: ${id}`);

    try {
      const response = await fetch(`${API_URL}/${id}`);
      console.log('News API Response status:', response.status);

      const result: NewsArticleResponse = await response.json();
      console.log('News API Response data:', result?.data);

      if (!response.ok) {
         console.error('News API Error:', result);
        throw new Error(result.details || result.error || "Failed to fetch news article");
      }

      return result.data || null;
    } catch (error) {
      console.error("Error in NewsService.getNewsById:", error);
      throw error;
    }
  }

  // Thêm tin tức mới (placeholder)
  static async addNews(article: Omit<NewsArticle, "id" | "created_at" | "updated_at">): Promise<NewsArticle> {
     console.log('NewsService.addNews called');
     // Implement POST logic here similar to PartnersService
     throw new Error("Add News not yet implemented");
  }

  // Cập nhật tin tức (placeholder)
  static async updateNews(id: number, article: Partial<NewsArticle>): Promise<NewsArticle> {
     console.log(`NewsService.updateNews called with ID: ${id}`);
     // Implement PUT logic here similar to PartnersService
     throw new Error("Update News not yet implemented");
  }

  // Xóa tin tức (placeholder)
  static async deleteNews(id: number): Promise<void> {
     console.log(`NewsService.deleteNews called with ID: ${id}`);
     // Implement DELETE logic here similar to PartnersService
     throw new Error("Delete News not yet implemented");
  }
} 