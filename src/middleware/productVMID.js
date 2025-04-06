import { productSchema, productUpdateSchema } from "../validator/index.js";

export const productVMID = {
  product: (req, res, next) => {
    try {
      productSchema.parse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  },

  productUpdate: (req, res, next) => {
    try {
      productUpdateSchema.parse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  },
};
