import { dbConnection } from "../db/index.js";

export const orderDetailController = {
  findOne: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) return res.status(404).send(`ID ${id} not found `);

      const query = `
            select * from orderDetail
            where orderDetailId = $1`;

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
            select * from orderDetail`;

      const result = await dbConnection.query(query);

      if (result.rowCount === 0)
        return res.status(404).send(`Insufficient length to get all`);

      res.json(result.rows);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    const { orderId, productId, quantity, unitPrice, totalPrice } = req.body;

    if (!orderId || !productId || !quantity || !unitPrice || !totalPrice) {
      return res.status(400).send(`All data required while posting`);
    }

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

    if (result.rowCount === 0)
      return res.status(404).send(`Data not returned while posting`);

    const id = result.rows[0].orderdetailid;

    res
      .status(201)
      .json({ orderDetailId: id, message: "Order Detail created" });
  },

  update: async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;

    if (
      !body.orderId &&
      !body.productId &&
      !body.quantity &&
      !body.unitPrice &&
      !body.totalPrice
    )
      return res.status(400).send(`At least one data required while updating`);

    const keys = Object.keys(body);
    const fields = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
    const values = [...Object.values(body), id];

    const query = `
        update orderDetail
        set ${fields}
        where orderDetailId = $${values.length} returning *`;

    const result = await dbConnection.query(query, values);

    if (result.rowCount === 0)
      return res.status(404).send(`Data not returned while updating`);

    res.json({ orderDetailId: id, message: "Order Detail updated" });
  },

  delete: async (req, res, next) => {
    const { id } = req.params;

    if (!id) return res.status(404).send(`ID ${id} not found`);

    const query = `
        delete from orderDetail 
        where orderDetailId = $1 returning *`;

    const result = await dbConnection.query(query, [id]);

    if (result.rowCount === 0)
      return res.status(404).send(`Data not returned while deleting`);

    res.json({ message: "Order Detail deleted" });
  },
};
