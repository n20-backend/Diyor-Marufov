import bcrypt from "bcrypt";
import { dbConnection } from "../db/index.js";
import { updatedat } from "../utils/index.js";

export const usersController = {
  findOne: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) return res.status(404).send(`User ID is required`);

      const query = `
            select * from users
            where userId = $1`;

      const result = await dbConnection.query(query, [id]);
      if (result.rowCount === 0)
        return res.status(404).send(`User by ID not found`);

      res.json(result.rows);
    } catch (error) {
      next(error);
    }
  },

  findALl: async (req, res, next) => {
    try {
      const query = `
            select * from users`;

      const result = await dbConnection.query(query);

      if (result.rowCount === 0) return res.status(404).send(`User not found`);

      res.json(result.rows);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const { email, username, password, role, status } = req.body;

      if (!email || !username || !password || !role || !status) {
        return res.status(400).send(`All data required while posting`);
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const query = `
          insert into users (email,username,password,role,status) values
          ($1,$2,$3,$4,$5) returning *`;

      const result = await dbConnection.query(query, [
        email,
        username,
        hashedPassword,
        role,
        status,
      ]);

      if (result.rowCount === 0)
        return res.status(404).send(`Data not returned while posting`);

      const id = result.rows[0].userid;
      res.status(201).json({ userId: id, message: "User created" });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;

      if (
        !id ||
        (!body.email &&
          !body.username &&
          !body.password &&
          !body.role &&
          !body.status)
      )
        return res
          .status(400)
          .send(
            `User ID is required or At least one data required while updating`
          );

      const utc5 = updatedat();

      const keys = Object.keys(body);
      const fields = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
      const values = [...Object.values(body), utc5, id];

      const query = `
          update users
          set ${fields}, updatedat = $${values.length - 1}
          where userId = $${values.length} returning *`;

      const result = await dbConnection.query(query, values);

      if (result.rowCount === 0)
        return res.status(404).send(`Data not returned while updating`);

      res.json({ userId: id, message: "User updated" });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) return res.status(404).send(`ID ${id} not found`);

      const query = `
          delete from users 
          where userId = $1 returning *`;

      const result = await dbConnection.query(query, [id]);

      if (result.rowCount === 0)
        return res.status(404).send(`Data not returned while deleting`);

      res.json({ message: "User deleted" });
    } catch (error) {
      next(error);
    }
  },
};
