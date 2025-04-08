import { dbConnection } from "../db/index.js";

export const categoryController = {
  findOne: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) return res.status(404).send(`Category ID is required`);

      const query = `
            select * from category 
            where categoryId = $1`;

      const result = await dbConnection.query(query, [id]);
      if (result.rowCount === 0)
        return res.status(404).send(`Category by ID not found`);

      res.json(result.rows);
    } catch (error) {
      next(error);
    }
  },

  findALl: async (req, res, next) => {
    try {
      const query = `
            select * from category`;

      const result = await dbConnection.query(query);

      if (result.rowCount === 0)
        return res.status(404).send(`Category not found`);

      res.json(result.rows);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const { name, description } = req.body;

      if (!name || !description) {
        return res.status(400).send(`All data required while posting`);
      }

      const query = `
          insert into category (name,description) values
          ($1,$2) returning *`;

      const result = await dbConnection.query(query, [name, description]);

      if (result.rowCount === 0)
        return res.status(404).send(`Data not returned while posting`);

      const id = result.rows[0].categoryid;

      res.status(201).json({ categoryId: id, message: "Category created" });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;

      if (!id || (!body.name && !body.description))
        return res
          .status(400)
          .send(
            `Category id is required or At least one data required while updating`
          );

      const date = new Date();
      const utc5 = new Date(date.getTime() + 5 * 60 * 60 * 1000).toISOString();

      const keys = Object.keys(body);
      const fields = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
      const values = [...Object.values(body), utc5, id];

      const query = `
          update category
          set ${fields}, updatedat = $${values.length - 1}
          where categoryId = $${values.length} returning *`;

      const result = await dbConnection.query(query, values);

      if (result.rowCount === 0)
        return res.status(404).send(`Data not returned while updating`);

      res.json({ categoryId: id, message: "Category updated" });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) return res.status(404).send(`Category ID is required`);

      const query = `
          delete from category 
          where categoryId = $1 returning *`;

      const result = await dbConnection.query(query, [id]);

      if (result.rowCount === 0)
        return res.status(404).send(`Data not returned while deleting`);

      res.json({ message: "Category deleted" });
    } catch (error) {
      next(error);
    }
  },
};
