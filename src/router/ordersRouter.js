import { Router } from "express";
import { ordersController } from "../controller/index.js";

const router = Router();

router.get("/orders", ordersController.findALl);
router.get("/orders/:id", ordersController.findOne);
router.post("/orders", ordersController.create);
router.put("/orders/:id", ordersController.update);
router.delete("/orders/:id", ordersController.delete);

export { router as ordersRouter };
