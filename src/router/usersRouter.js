import { Router } from "express";
import { usersController } from "../controller/index.js";
import { userSchema, userUpdateSchema } from "../validator/index.js";
import { validate } from "../utils/index.js";

const router = Router();

router.get("/users", usersController.findALl);
router.get("/users/:id", usersController.findOne);
router.post("/users", validate(userSchema), usersController.create);
router.put("/users/:id", validate(userUpdateSchema), usersController.update);
router.delete("/users/:id", usersController.delete);

export { router as usersRouter };
