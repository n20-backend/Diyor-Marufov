import { Router } from "express";
import { orderDetailController } from "../controller/index.js";
import { orderDetailVMID } from "../middleware/index.js";

const router = Router();

router.get("/orderDetail", orderDetailController.findALl);
router.get("/orderDetail/:id", orderDetailController.findOne);
router.post(
  "/orderDetail",
  orderDetailVMID.orderDetail,
  orderDetailController.create
);
router.put(
  "/orderDetail/:id",
  orderDetailVMID.orderDetailUpdate,
  orderDetailController.update
);
router.delete("/orderDetail/:id", orderDetailController.delete);

export { router as orderDetailRouter };
