import { dbConnection } from "../config/index.js";

export const paymentController = {
  findOne: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) return res.status(404).send(`ID ${id} not found `);

      const query = `
            select * from payment
            where paymentId = $1`;

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
            select * from payment`;

      const result = await dbConnection.query(query);

      if (result.rowCount === 0)
        return res.status(404).send(`Insufficient length to get all`);

      res.json(result.rows);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    const { orderId, amount, method, status } = req.body;

    if (!orderId || !amount || !method || !status) {
      return res.status(400).send(`All data required while posting`);
    }

    const query = `
        insert into payment (orderId,amount,method,status) values
        ($1,$2,$3,$4) returning *`;

    const result = await dbConnection.query(query, [
      orderId,
      amount,
      method,
      status,
    ]);

    if (result.rowCount === 0)
      return res.status(404).send(`Data not returned while posting`);

    res.status(201).json(result.rows);
  },

  update: async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;

    if (!body.orderId && !body.amount && !body.method && !body.status)
      return res.status(400).send(`At least one data required while updating`);

    const keys = Object.keys(body);
    const fields = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
    const values = [...Object.values(body), id];

    const query = `
        update payment
        set ${fields}
        where paymentId = $${values.length} returning *`;

    const result = await dbConnection.query(query, values);

    if (result.rowCount === 0)
      return res.status(404).send(`Data not returned while updating`);

    res.json(result.rows);
  },

  delete: async (req, res, next) => {
    const { id } = req.params;

    if (!id) return res.status(404).send(`ID ${id} not found`);

    const query = `
        delete from payment 
        where paymentId = $1 returning *`;

    const result = await dbConnection.query(query, [id]);

    if (result.rowCount === 0)
      return res.status(404).send(`Data not returned while deleting`);

    res.json(result.rows);
  },
};
