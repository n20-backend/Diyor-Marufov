import { dbConnection } from "../db/index.js";
import { updatedat } from "../utils/index.js";

export const ordersController = {
  findOne: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) return res.status(404).send(`Order ID is required`);

      const query = `
            select * from orders 
            where orderId = $1`;

      const result = await dbConnection.query(query, [id]);
      if (result.rowCount === 0)
        return res.status(404).send(`Order by ID not found`);

      res.json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  },

  findALl: async (req, res, next) => {
    try {
      const query = `
            select * from orders`;

      const result = await dbConnection.query(query);

      if (result.rowCount === 0)
        return res.status(404).send(`Orders not found`);

      res.json(result.rows);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    const client = await dbConnection.connect();
    try {
      const { userId, totalAmount } = req.body;

      if (!userId || !totalAmount) {
        return res.status(400).send(`All data required while posting`);
      }

      await client.query("BEGIN");

      const query = `
          insert into orders (userId,totalAmount) values
          ($1,$2) returning *`;

      const result = await dbConnection.query(query, [userId, totalAmount]);

      await client.query("COMMIT");

      if (result.rowCount === 0)
        return res.status(404).send(`Data not returned while posting`);

      const id = result.rows[0].orderid;
      res.status(201).json({ orderId: id, message: "Order created" });
    } catch (error) {
      await client.query("ROLLBACK");
      res.status(500).send("Something went wrong");
    } finally {
      client.release();
    }
  },

  update: async (req, res, next) => {
    const client = await dbConnection.connect();
    try {
      const { id } = req.params;
      const body = req.body;

      if (!id || (!body.userId && !body.totalAmount))
        return res
          .status(400)
          .send(
            `Order ID is required or At least one data required while updating`
          );

      const utc5 = updatedat();

      const keys = Object.keys(body);
      const fields = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
      const values = [...Object.values(body), utc5, id];

      await client.query("BEGIN");

      const query = `
          update orders
          set ${fields}, updatedat = $${values.length - 1}
          where orderId = $${values.length} returning *`;

      const result = await dbConnection.query(query, values);

      await client.query("COMMIT");

      if (result.rowCount === 0)
        return res.status(404).send(`Data not returned while updating`);

      res.json({ orderId: id, message: "Order updated" });
    } catch (error) {
      await client.query("ROLLBACK");
      res.status(500).send("Something went wrong");
    } finally {
      client.release();
    }
  },

  delete: async (req, res, next) => {
    const client = await dbConnection.connect();
    try {
      const { id } = req.params;

      if (!id) return res.status(404).send(`Order ID is requireed`);

      await client.query("BEGIN");

      const query = `
          delete from orders 
          where orderId = $1 returning *`;

      const result = await dbConnection.query(query, [id]);

      await client.query("COMMIT");

      if (result.rowCount === 0)
        return res.status(404).send(`Data not returned while deleting`);

      res.json({ message: "Order deleted" });
    } catch (error) {
      await client.query("ROLLBACK");
      res.status(500).send("Something went wrong");
    } finally {
      client.release();
    }
  },
};
