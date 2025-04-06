import { reviewSchema, reviewUpdateSchema } from "../validator/index.js";

export const reviewVMID = {
  review: (req, res, next) => {
    try {
      reviewSchema.parse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  },

  reviewUpdate: (req, res, next) => {
    try {
      reviewUpdateSchema.parse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  },
};
