import { userSchema, userUpdateSchema } from "../validator/index.js";

export const usersVMID = {
  users: (req, res, next) => {
    try {
      userSchema.parse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  },

  usersUpdate: (req, res, next) => {
    try {
      userUpdateSchema.parse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  },
};
