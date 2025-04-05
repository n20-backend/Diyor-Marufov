import { dbConnection } from "../config/index.js";

export const categoryController = {
  findOne: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) return res.status(404).send(`ID ${id} not found `);

      const query = `
            select * from category 
            where categoryId = $1`;

      const result = await dbConnection.query(query, [id]);
      if (result.rowCount === 0)
        return res.status(404).send(`Insufficient length to get one`);

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
        return res.status(404).send(`Insufficient length to get all`);

      res.json(result.rows);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
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

    res.status(201).json(result.rows);
  },

  update: async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;

    if (!body.name && !body.description)
      return res.status(400).send(`At least one data required while updating`);

    const keys = Object.keys(body);
    const fields = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
    const values = [...Object.values(body), id];

    const query = `
        update category
        set ${fields}
        where categoryId = $${values.length} returning *`;

    const result = await dbConnection.query(query, values);

    if (result.rowCount === 0)
      return res.status(404).send(`Data not returned while updating`);

    res.json(result.rows);
  },

  delete: async (req, res, next) => {
    const { id } = req.params;

    if (!id) return res.status(404).send(`ID ${id} not found`);

    const query = `
        delete from category 
        where categoryId = $1 returning *`;

    const result = await dbConnection.query(query, [id]);

    if (result.rowCount === 0)
      return res.status(404).send(`Data not returned while deleting`);

    res.json(result.rows);
  },
};
