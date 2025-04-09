import { dbConnection } from "../db/index.js";
import { updatedat } from "../utils/index.js";

export const reviewController = {
  findOne: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) return res.status(404).send(`Review ID is required`);

      const query = `
            select * from review
            where reviewId = $1`;

      const result = await dbConnection.query(query, [id]);
      if (result.rowCount === 0)
        return res.status(404).send(`Review by ID not found`);

      res.json(result.rows);
    } catch (error) {
      next(error);
    }
  },

  findALl: async (req, res, next) => {
    try {
      const query = `
            select * from review`;

      const result = await dbConnection.query(query);

      if (result.rowCount === 0)
        return res.status(404).send(`Review not found`);

      res.json(result.rows);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    const client = await dbConnection.connect();

    try {
      const { productId, userId, rating, comment, status } = req.body;

      if (!productId || !userId || !rating || !comment || !status) {
        return res.status(400).send(`All data required while posting`);
      }

      await client.query("BEGIN");

      const query = `
          insert into review (productId,userId,rating,comment,status) values
          ($1,$2,$3,$4,$5) returning *`;

      const result = await dbConnection.query(query, [
        productId,
        userId,
        rating,
        comment,
        status,
      ]);

      await client.query("COMMIT");

      if (result.rowCount === 0)
        return res.status(404).send(`Data not returned while posting`);

      const id = result.rows[0].reviewid;
      res.status(201).json({ reviewId: id, message: "Review created" });
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
        (!body.productId &&
          !body.userId &&
          !body.rating &&
          !body.comment &&
          !body.status)
      )
        return res
          .status(400)
          .send(
            `Review ID is required or At least one data required while updating`
          );

      const utc5 = updatedat();

      const keys = Object.keys(body);
      const fields = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
      const values = [...Object.values(body), utc5, id];

      await client.query("BEGIN");

      const query = `
          update review
          set ${fields}, updatedat = $${values.length - 1}
          where reviewId = $${values.length} returning *`;

      const result = await dbConnection.query(query, values);

      await client.query("COMMIT");

      if (result.rowCount === 0)
        return res.status(404).send(`Data not returned while updating`);

      res.json({ reviewId: id, message: "Review updated" });
    } catch (error) {
      await client.query("ROLLBACK");
      res.send(500).status("Something went wrong");
    } finally {
      client.release();
    }
  },

  delete: async (req, res, next) => {
    const client = await dbConnection.connect();

    try {
      const { id } = req.params;

      if (!id) return res.status(404).send(`Review ID is required`);

      await client.query("BEGIN");

      const query = `
          delete from review 
          where reviewId = $1 returning *`;

      const result = await dbConnection.query(query, [id]);

      await client.query("COMMIT");

      if (result.rowCount === 0)
        return res.status(404).send(`Data not returned while deleting`);

      res.json({ message: "Review deleted" });
    } catch (error) {
      await client.query("ROLLBACK");
      res.status(500).send("Something went wrong");
    } finally {
      client.release();
    }
  },
};
