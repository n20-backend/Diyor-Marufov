import { Router } from "express";
import { paymentController } from "../controller/index.js";
import { paymentSchema, paymentUpdateSchema } from "../validator/index.js";
import { validate } from "../utils/index.js";

const router = Router();

router.get("/payment", paymentController.findALl);
router.get("/payment/:id", paymentController.findOne);
router.post("/payment", validate(paymentSchema), paymentController.create);
router.put(
  "/payment/:id",
  validate(paymentUpdateSchema),
  paymentController.update
);
router.delete("/payment/:id", paymentController.delete);

export { router as paymentRouter };
