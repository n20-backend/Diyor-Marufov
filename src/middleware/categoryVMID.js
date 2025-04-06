import { categorySchema, categoryUpdateSchema } from "../validator/index.js";

export const categoryVMID = {
  category: (req, res, next) => {
    try {
      categorySchema.parse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  },

  categoryUpdate: (req, res, next) => {
    try {
      categoryUpdateSchema.parse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  },
};
