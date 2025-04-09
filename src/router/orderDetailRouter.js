import { Router } from "express";
import { orderDetailController } from "../controller/index.js";
import {
  orderDetailSchema,
  orderDetailUpdateSchema,
} from "../validator/index.js";
import { validate } from "../utils/index.js";

const router = Router();

router.get("/orderDetail", orderDetailController.findALl);
router.get("/orderDetail/:id", orderDetailController.findOne);
router.post(
  "/orderDetail",
  validate(orderDetailSchema),
  orderDetailController.create
);
router.put(
  "/orderDetail/:id",
  validate(orderDetailUpdateSchema),
  orderDetailController.update
);
router.delete("/orderDetail/:id", orderDetailController.delete);

export { router as orderDetailRouter };
