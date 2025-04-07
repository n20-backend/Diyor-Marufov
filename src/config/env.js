import pg from "pg";
import dotenv from "dotenv";
const { Pool } = pg;

dotenv.config();

export const connection = new Pool({
  connectionString: process.env.DB_CONNECTION
});
