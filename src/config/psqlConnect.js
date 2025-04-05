import pg from "pg";
import dotenv from "dotenv"
const { Pool } = pg;

dotenv.config()

const connection = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
});

await connection.connect()
  .then(() => {
    console.log(`Database connected`);
  })
  .catch((err) => {
    console.log(`Error connecting with PostgresSQL`, err.message);
  });

export { connection as dbConnection };
