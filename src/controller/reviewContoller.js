import { dbConnection } from "../db/index.js";

export const reviewController = {
  findOne: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) return res.status(404).send(`ID ${id} not found `);

      const query = `
            select * from review
            where reviewId = $1`;

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
            select * from review`;

      const result = await dbConnection.query(query);

      if (result.rowCount === 0)
        return res.status(404).send(`Insufficient length to get all`);

      res.json(result.rows);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    const { productId, userId, rating, comment, status } = req.body;

    if (!productId || !userId || !rating || !comment || !status) {
      return res.status(400).send(`All data required while posting`);
    }

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

    if (result.rowCount === 0)
      return res.status(404).send(`Data not returned while posting`);

    const id = result.rows[0].reviewid;
    res.status(201).json({ reviewId: id, message: "Review created" });
  },

  update: async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;

    if (
      !body.productId &&
      !body.userId &&
      !body.rating &&
      !body.comment &&
      !body.status
    )
      return res.status(400).send(`At least one data required while updating`);

    const keys = Object.keys(body);
    const fields = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
    const values = [...Object.values(body), id];

    const query = `
        update review
        set ${fields}
        where reviewId = $${values.length} returning *`;

    const result = await dbConnection.query(query, values);

    if (result.rowCount === 0)
      return res.status(404).send(`Data not returned while updating`);

    res.json({ reviewId: id, message: "Review updated" });
  },

  delete: async (req, res, next) => {
    const { id } = req.params;

    if (!id) return res.status(404).send(`ID ${id} not found`);

    const query = `
        delete from review 
        where reviewId = $1 returning *`;

    const result = await dbConnection.query(query, [id]);

    if (result.rowCount === 0)
      return res.status(404).send(`Data not returned while deleting`);

    res.json({ message: "Review deleted" });
  },
};
