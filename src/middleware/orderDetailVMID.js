import {
  orderDetailSchema,
  orderDetailUpdateSchema,
} from "../validator/index.js";

export const orderDetailVMID = {
  orderDetail: (req, res, next) => {
    try {
      orderDetailSchema.parse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  },

  orderDetailUpdate: (req, res, next) => {
    try {
      orderDetailUpdateSchema.parse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  },
};
