import { ordersSchema, ordersUpdateSchema } from "../validator/index.js";

export const ordersVMID = {
  orders: (req, res, next) => {
    try {
      ordersSchema.parse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  },

  orderUpdate: (req, res, next) => {
    try {
      ordersUpdateSchema.parse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  },
};
