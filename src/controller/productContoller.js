import { dbConnection } from "../db/index.js";
import { updatedat } from "../utils/index.js";

export const productController = {
  findOne: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).send(`Product ID is required`);

      const query = `
            select * from product
            where productId = $1`;

      const result = await dbConnection.query(query, [id]);
      if (result.rowCount === 0)
        return res.status(404).send(`Insufficient length to get one`);

      res.status(200).json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  },

  findALl: async (req, res, next) => {
    try {
      const query = `
            select * from product`;

      const result = await dbConnection.query(query);

      if (result.rowCount === 0)
        return res.status(404).send(`No products found`);

      res.status(200).json(result.rows);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    const client = await dbConnection.connect();
    try {
      const {
        name,
        description,
        categoryId,
        price,
        currency,
        stockQuantity,
        imageUrl,
      } = req.body;

      await client.query("BEGIN");

      const query = `
          insert into product (name,description,categoryId,price,currency,stockQuantity,imageUrl) values
          ($1,$2,$3,$4,$5,$6,$7) returning *`;

      const result = await client.query(query, [
        name,
        description,
        categoryId,
        price,
        currency,
        stockQuantity,
        imageUrl,
      ]);

      await client.query("COMMIT");
      if (result.rowCount === 0)
        return res.status(404).send(`Product not found`);

      const id = result.rows[0].productid;
      res.status(201).json({ productId: id, message: "Product Created" });
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

      if (!id) return res.status(400).send(`Product ID is required`);

      const utc5 = updatedat();

      const keys = Object.keys(body);
      const fields = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
      const values = [...Object.values(body), utc5, id];

      await client.query("BEGIN");

      const query = `
          update product
          set ${fields}, updatedat = $${values.length - 1} 
          where productId = $${values.length} returning *`;

      const result = await client.query(query, values);

      await client.query("COMMIT");

      if (result.rowCount === 0)
        return res.status(404).send(`Data not returned while updating`);

      res.status(200).json({ productId: id, message: "Product updated" });
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

      if (!id) return res.status(404).send(`Product ID is required`);

      await client.query("BEGIN");
      const query = `
          delete from product 
          where productId = $1 returning *`;

      const result = await client.query(query, [id]);

      await client.query("COMMIT");
      if (result.rowCount === 0)
        return res.status(404).send(`Data not returned while deleting`);

      res.status(200).json({ message: "Product deleted" });
    } catch (error) {
      await client.query("ROLLBACK");
      res.status(500).send("Something went wrong");
    } finally {
      client.release();
    }
  },
};
