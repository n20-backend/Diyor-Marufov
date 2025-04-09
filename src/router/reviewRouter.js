import { Router } from "express";
import { reviewController } from "../controller/index.js";
import { reviewSchema, reviewUpdateSchema } from "../validator/index.js";
import { validate } from "../utils/index.js";

const router = Router();

router.get("/review", reviewController.findALl);
router.get("/review/:id", reviewController.findOne);
router.post("/review", validate(reviewSchema), reviewController.create);
router.put(
  "/review/:id",
  validate(reviewUpdateSchema),
  reviewController.update
);
router.delete("/review/:id", reviewController.delete);

export { router as reviewRouter };
