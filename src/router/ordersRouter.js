import { Router } from "express";
import { ordersController } from "../controller/index.js";
import { ordersSchema, ordersUpdateSchema } from "../validator/index.js";
import { validate } from "../utils/index.js";

const router = Router();

router.get("/orders", ordersController.findALl);
router.get("/orders/:id", ordersController.findOne);
router.post("/orders", validate(ordersSchema), ordersController.create);
router.put(
  "/orders/:id",
  validate(ordersUpdateSchema),
  ordersController.update
);
router.delete("/orders/:id", ordersController.delete);

export { router as ordersRouter };
