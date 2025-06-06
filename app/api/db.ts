// db.ts
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // Đọc .env vào process.env

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export default pool;
