import { Router } from "express";
import { orderDetailController } from "../controller/index.js";

const router = Router();

router.get("/orderDetail", orderDetailController.findALl);
router.get("/orderDetail/:id", orderDetailController.findOne);
router.post("/orderDetail", orderDetailController.create);
router.put("/orderDetail/:id", orderDetailController.update);
router.delete("/orderDetail/:id", orderDetailController.delete);

export { router as orderDetailRouter };
