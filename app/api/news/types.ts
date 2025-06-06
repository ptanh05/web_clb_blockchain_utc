export interface NewsArticle {
  id: number;
  title: string;
  slug: string;
  date: string; // Consider using Date type if possible
  time: string; // Consider using Date type if possible
  image: string;
  excerpt: string;
  content: string;
  category: string; // Consider a union type if categories are fixed
  tags: string[]; // Stored as comma-separated string in DB
  author: {
    name: string;
    role: string;
    image: string;
  };
  readTime: string;
  views: number;
  likes: number;
  comments: number;
  created_at?: string; // Assuming added by DB
  updated_at?: string; // Assuming added by DB
}

// Database representation (tags as string)
export interface NewsArticleDB extends Omit<NewsArticle, 'tags' | 'author'> {
  tags: string; // Stored as comma-separated string
  author_name: string; // Flattening author object for DB
  author_role: string;
  author_image: string;
}

// API Response types
export interface NewsArticleResponse {
  data?: NewsArticle;
  error?: string;
  details?: string;
}

export interface NewsArticlesResponse {
  data?: NewsArticle[];
  error?: string;
  details?: string;
}

// Helper functions for string/array conversion
export function parseStringArray(str: string | null | undefined): string[] {
  if (!str) return [];
  return str.split(',').map(item => item.trim()).filter(Boolean);
}

export function stringifyArray(arr: string[] | null | undefined): string {
  if (!Array.isArray(arr)) return '';
  return arr.filter(Boolean).join(',');
} 