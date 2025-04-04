import { Router } from "express";
import { paymentController } from "../controller/index.js";

const router = Router();

router.get("/payment", paymentController.findALl);
router.get("/payment/:id", paymentController.findOne);
router.post("/payment", paymentController.create);
router.put("/payment/:id", paymentController.update);
router.delete("/payment/:id", paymentController.delete);

export { router as paymentRouter };
