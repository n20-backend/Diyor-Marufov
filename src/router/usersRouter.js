import { Router } from "express";
import { usersController } from "../controller/index.js";
import { usersVMID } from "../middleware/index.js";

const router = Router();

router.get("/users", usersController.findALl);
router.get("/users/:id", usersController.findOne);
router.post("/users", usersVMID.users, usersController.create);
router.put("/users/:id", usersVMID.usersUpdate, usersController.update);
router.delete("/users/:id", usersController.delete);

export { router as usersRouter };
