import { NewsArticle, NewsArticleDB, parseStringArray, stringifyArray } from "./types";

// Helper function to convert DB NewsArticle to frontend NewsArticle
export const convertDBNewsArticleToNewsArticle = (dbArticle: NewsArticleDB): NewsArticle => ({
  id: dbArticle.id,
  title: dbArticle.title,
  slug: dbArticle.slug,
  date: dbArticle.date,
  time: dbArticle.time,
  image: dbArticle.image,
  excerpt: dbArticle.excerpt,
  content: dbArticle.content,
  category: dbArticle.category,
  tags: parseStringArray(dbArticle.tags),
  author: {
    name: dbArticle.author_name,
    role: dbArticle.author_role,
    image: dbArticle.author_image,
  },
  readTime: dbArticle.readTime,
  views: dbArticle.views,
  likes: dbArticle.likes,
  comments: dbArticle.comments,
  created_at: dbArticle.created_at,
  updated_at: dbArticle.updated_at,
});

// Helper function to convert frontend NewsArticle to DB NewsArticle
export const convertNewsArticleToDBNewsArticle = (
  article: Omit<NewsArticle, 'id' | 'created_at' | 'updated_at'> | Partial<NewsArticle>
): Partial<NewsArticleDB> => ({
  ...article,
  author_name: article.author?.name,
  author_role: article.author?.role,
  author_image: article.author?.image,
  tags: article.tags !== undefined ? stringifyArray(article.tags) : undefined,
});

// Validation functions
export const validateNewsArticle = (article: Partial<NewsArticle>): string[] => {
  const errors: string[] = [];
  const requiredFields = [
    { field: 'title', name: 'Title' },
    { field: 'slug', name: 'Slug' },
    { field: 'date', name: 'Date' },
    { field: 'image', name: 'Image' },
    { field: 'excerpt', name: 'Excerpt' },
    { field: 'content', name: 'Content' },
    { field: 'category', name: 'Category' },
  ];

  requiredFields.forEach(({ field, name }) => {
    if (!article[field as keyof NewsArticle]) {
      errors.push(`${name} is required`);
    }
  });

  if (article.author) {
    if (!article.author.name) errors.push('Author name is required');
    if (!article.author.role) errors.push('Author role is required');
    if (!article.author.image) errors.push('Author image is required');
  } else {
    errors.push('Author information is required');
  }

  return errors;
};

// Query builder functions
export const buildNewsQuery = (category: string, search: string) => {
  let query = "SELECT * FROM news";
  const params: any[] = [];
  const conditions: string[] = [];
  let paramIndex = 1;

  if (category && category !== "all") {
    conditions.push(`category = $${paramIndex++}`);
    params.push(category);
  }

  if (search) {
    conditions.push(
      `(title ILIKE $${paramIndex} OR excerpt ILIKE $${paramIndex} OR content ILIKE $${paramIndex})`
    );
    params.push(`%${search}%`);
    paramIndex++;
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  query += " ORDER BY created_at DESC";
  return { query, params };
};

export const buildUpdateQuery = (id: string, fields: string[]) => {
  const updateClauses = fields.map((field, index) => `"${field}" = $${index + 2}`).join(', ');
  const query = `UPDATE news SET ${updateClauses} WHERE id = $1 RETURNING *`;
  return query;
}; 