import { sql } from "@vercel/postgres";
import { Media, MediaDB, MediaListResponse, MediaResponse, convertDBMediaToMedia, convertMediaToDBMedia } from "./types";

export class MediaService {
  static async getAllMedia(
    type?: string,
    category?: string,
    search?: string
  ): Promise<Media[]> {
    try {
      let query = "SELECT * FROM media WHERE 1=1";
      const params: any[] = [];
      let paramIndex = 1;

      if (type && type !== "all") {
        query += ` AND type = $${paramIndex}`;
        params.push(type);
        paramIndex++;
      }

      if (category && category !== "all") {
        query += ` AND category = $${paramIndex}`;
        params.push(category);
        paramIndex++;
      }

      if (search) {
        query += ` AND (
          title ILIKE $${paramIndex} OR
          tags ILIKE $${paramIndex} OR
          category ILIKE $${paramIndex}
        )`;
        params.push(`%${search}%`);
        paramIndex++;
      }

      query += " ORDER BY created_at DESC";

      const result = await sql.query(query, params);
      return result.rows.map(convertDBMediaToMedia);
    } catch (error) {
      console.error("Error in MediaService.getAllMedia:", error);
      throw error;
    }
  }

  static async getMediaById(id: number): Promise<Media> {
    try {
      const result = await sql.query("SELECT * FROM media WHERE id = $1", [id]);
      
      if (result.rows.length === 0) {
        throw new Error(`Media with ID ${id} not found`);
      }

      return convertDBMediaToMedia(result.rows[0]);
    } catch (error) {
      console.error(`Error in MediaService.getMediaById(${id}):`, error);
      throw error;
    }
  }

  static async addMedia(media: Media): Promise<Media> {
    try {
      const dbMedia = convertMediaToDBMedia(media);
      const fields = Object.keys(dbMedia).filter(key => key !== 'id');
      const values = fields.map(field => dbMedia[field as keyof MediaDB]);
      const placeholders = fields.map((_, index) => `$${index + 1}`).join(", ");
      
      const query = `
        INSERT INTO media (${fields.join(", ")})
        VALUES (${placeholders})
        RETURNING *
      `;

      const result = await sql.query(query, values);
      return convertDBMediaToMedia(result.rows[0]);
    } catch (error) {
      console.error("Error in MediaService.addMedia:", error);
      throw error;
    }
  }

  static async updateMedia(id: number, media: Partial<Media>): Promise<Media> {
    try {
      const dbMedia = convertMediaToDBMedia(media as Media);
      const fields = Object.keys(dbMedia).filter(
        key => key !== 'id' && dbMedia[key as keyof MediaDB] !== undefined
      );

      if (fields.length === 0) {
        throw new Error("No valid fields provided for update");
      }

      const setClause = fields
        .map((field, index) => `${field} = $${index + 2}`)
        .join(", ");
      const query = `
        UPDATE media 
        SET ${setClause}, updated_at = NOW()
        WHERE id = $1
        RETURNING *
      `;

      const values = [id, ...fields.map(field => dbMedia[field as keyof MediaDB])];
      const result = await sql.query(query, values);

      if (result.rows.length === 0) {
        throw new Error(`Media with ID ${id} not found`);
      }

      return convertDBMediaToMedia(result.rows[0]);
    } catch (error) {
      console.error(`Error in MediaService.updateMedia(${id}):`, error);
      throw error;
    }
  }

  static async deleteMedia(id: number): Promise<void> {
    try {
      const result = await sql.query(
        "DELETE FROM media WHERE id = $1 RETURNING id",
        [id]
      );

      if (result.rows.length === 0) {
        throw new Error(`Media with ID ${id} not found`);
      }
    } catch (error) {
      console.error(`Error in MediaService.deleteMedia(${id}):`, error);
      throw error;
    }
  }

  static async incrementViews(id: number): Promise<void> {
    try {
      await sql.query(
        "UPDATE media SET views = views + 1 WHERE id = $1",
        [id]
      );
    } catch (error) {
      console.error(`Error in MediaService.incrementViews(${id}):`, error);
      throw error;
    }
  }

  static async incrementDownloads(id: number): Promise<void> {
    try {
      await sql.query(
        "UPDATE media SET downloads = downloads + 1 WHERE id = $1 AND type IN ('image', 'document')",
        [id]
      );
    } catch (error) {
      console.error(`Error in MediaService.incrementDownloads(${id}):`, error);
      throw error;
    }
  }
} 