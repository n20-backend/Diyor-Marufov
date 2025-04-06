import { Router } from "express";
import { ordersController } from "../controller/index.js";
import { ordersVMID } from "../middleware/index.js";

const router = Router();

router.get("/orders", ordersController.findALl);
router.get("/orders/:id", ordersController.findOne);
router.post("/orders", ordersVMID.orders, ordersController.create);
router.put("/orders/:id", ordersVMID.orderUpdate, ordersController.update);
router.delete("/orders/:id", ordersController.delete);

export { router as ordersRouter };
