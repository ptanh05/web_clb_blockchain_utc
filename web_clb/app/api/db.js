import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

console.log("Connection string:", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_UOjJ5ow0XgLl@ep-odd-violet-a8gvvezh-pooler.eastus2.azure.neon.tech/neondb?sslmode=require",
  ssl: { rejectUnauthorized: false },
});

export default pool;
