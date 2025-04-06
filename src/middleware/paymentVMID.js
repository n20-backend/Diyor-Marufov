import { paymentSchema, paymentUpdateSchema } from "../validator/index.js";

export const paymentVMID = {
  payment: (req, res, next) => {
    try {
      paymentSchema.parse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  },

  paymentUpdate: (req, res, next) => {
    try {
      paymentUpdateSchema.parse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  },
};
