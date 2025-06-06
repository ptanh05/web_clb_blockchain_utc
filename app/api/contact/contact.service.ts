import pool from "@/app/api/db";
import type { ContactFormData } from "./types";

export class ContactService {
  static async createContactMessage(data: ContactFormData) {
    const client = await pool.connect();
    try {
      const result = await client.query(
        'INSERT INTO contact(name, email, subject, message) VALUES($1, $2, $3, $4) RETURNING *',
        [data.name, data.email, data.subject, data.message]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }
} 