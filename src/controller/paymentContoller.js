import { dbConnection } from "../db/index.js";
import { updatedat } from "../utils/index.js";

export const paymentController = {
  findOne: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).send(`Payment ID is required`);

      const query = `
            select * from payment
            where paymentId = $1`;

      const result = await dbConnection.query(query, [id]);
      if (result.rowCount === 0)
        return res.status(404).send(`Payment by ID not found`);

      res.status(200).json(result.rows);
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
        return res.status(404).send(`Payment not found`);

      res.status(200).json(result.rows);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    const client = await dbConnection.connect();

    try {
      const { orderId, amount, method, status } = req.body;

      await client.query("BEGIN");

      const query = `
         insert into payment (orderId,amount,method,status) values
         ($1,$2,$3,$4) returning *`;

      const result = await dbConnection.query(query, [
        orderId,
        amount,
        method,
        status,
      ]);

      await client.query("COMMIT");

      if (result.rowCount === 0)
        return res.status(404).send(`Data not returned while posting`);

      const id = result.rows[0].paymentid;
      res.status(201).json({ paymentId: id, message: "Payment created" });
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

      if (!id) return res.status(400).send(`Payment ID is required`);

      const utc5 = updatedat();

      const keys = Object.keys(body);
      const fields = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
      const values = [...Object.values(body), utc5, id];

      await client.query("BEGIN");

      const query = `
          update payment
          set ${fields}, updatedat = $${values.length - 1}
          where paymentId = $${values.length} returning *`;

      const result = await dbConnection.query(query, values);

      await client.query("COMMIT");

      if (result.rowCount === 0)
        return res.status(404).send(`Data not returned while updating`);

      res.status(200).json({ paymentId: id, message: "Payment updated" });
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

      if (!id) return res.status(400).send(`Payment ID is required`);

      await client.query("BEGIN");

      const query = `
          delete from payment 
          where paymentId = $1 returning *`;

      const result = await dbConnection.query(query, [id]);

      await client.query("COMMIT");

      if (result.rowCount === 0)
        return res.status(404).send(`Data not returned while deleting`);

      res.status(200).json({ message: "Payment deleted" });
    } catch (error) {
      await client.query("ROLLBACK");
      res.status(500).send("Something went wrong");
    } finally {
      client.release();
    }
  },
};
