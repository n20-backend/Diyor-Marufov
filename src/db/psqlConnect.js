import { connection } from "../config/index.js";

await connection
  .connect()
  .then(() => {
    console.log(`Database connected`);
  })
  .catch((err) => {
    console.log(`Error connecting with PostgresSQL`, err.message);
  });

export { connection as dbConnection };
