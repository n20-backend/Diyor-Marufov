import pg from "pg";
import dotenv from "dotenv";
const { Pool } = pg;

dotenv.config();

export const connection = new Pool({
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "2703",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_DATABASE || "e_commerce_project",
  port: process.env.DB_PORT || 5432,
});
