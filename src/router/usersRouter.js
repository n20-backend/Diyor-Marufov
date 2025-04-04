import { Router } from "express";
import { usersController } from "../controller/index.js";

const router = Router();

router.get("/users", usersController.findALl);
router.get("/users/:id", usersController.findOne);
router.post("/users", usersController.create);
router.put("/users/:id", usersController.update);
router.delete("/users/:id", usersController.delete);

export { router as usersRouter };
