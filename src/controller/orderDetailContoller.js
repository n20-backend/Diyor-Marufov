import { dbConnection } from "../db/index.js";

export const orderDetailController = {
  findOne: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) return res.status(404).send(`Order Detail ID is required`);

      const query = `
            select * from orderDetail
            where orderDetailId = $1`;

      const result = await dbConnection.query(query, [id]);
      if (result.rowCount === 0)
        return res.status(404).send(`Order Detail by ID not found`);

      res.json(result.rows);
    } catch (error) {
      next(error);
    }
  },

  findALl: async (req, res, next) => {
    try {
      const query = `
            select * from orderDetail`;

      const result = await dbConnection.query(query);

      if (result.rowCount === 0)
        return res.status(404).send(`Order Detail not found`);

      res.json(result.rows);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    const client = await dbConnection.connect();

    try {
      const { orderId, productId, quantity, unitPrice, totalPrice } = req.body;

      if (!orderId || !productId || !quantity || !unitPrice || !totalPrice) {
        return res.status(400).send(`All data required while posting`);
      }

      await client.query("BEGIN");

      const query = `
          insert into orderDetail (orderId,productId,quantity,unitPrice,totalPrice) values
          ($1,$2,$3,$4,$5) returning *`;

      const result = await dbConnection.query(query, [
        orderId,
        productId,
        quantity,
        unitPrice,
        totalPrice,
      ]);

      await client.query("COMMIT");

      if (result.rowCount === 0)
        return res.status(404).send(`Data not returned while posting`);

      const id = result.rows[0].orderdetailid;

      res
        .status(201)
        .json({ orderDetailId: id, message: "Order Detail created" });
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

      if (
        !id ||
        (!body.orderId &&
          !body.productId &&
          !body.quantity &&
          !body.unitPrice &&
          !body.totalPrice)
      )
        return res
          .status(400)
          .send(
            `Order Detail ID is required or At least one data required while updating`
          );

      const date = new Date();
      const utc5 = new Date(date.getTime() + 5 * 60 * 60 * 1000).toISOString();

      const keys = Object.keys(body);
      const fields = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
      const values = [...Object.values(body), utc5, id];

      await client.query("BEGIN");

      const query = `
          update orderDetail
          set ${fields}, updatedat = $${values.length - 1}
          where orderDetailId = $${values.length} returning *`;

      const result = await dbConnection.query(query, values);

      await client.query("COMMIT");

      if (result.rowCount === 0)
        return res.status(404).send(`Data not returned while updating`);

      res.json({ orderDetailId: id, message: "Order Detail updated" });
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

      if (!id) return res.status(404).send(`Order Deatail ID is required`);

      await client.query("BEGIN");

      const query = `
          delete from orderDetail 
          where orderDetailId = $1 returning *`;

      const result = await dbConnection.query(query, [id]);

      await client.query("COMMIT");

      if (result.rowCount === 0)
        return res.status(404).send(`Data not returned while deleting`);

      res.json({ message: "Order Detail deleted" });
    } catch (error) {
      await client.query("ROLLBACK");
      res.status(500).send("Something went wrong");
    } finally {
      client.release();
    }
  },
};
