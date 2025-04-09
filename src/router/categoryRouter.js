import { Router } from "express";
import { categoryController } from "../controller/index.js";
import { categorySchema, categoryUpdateSchema } from "../validator/index.js";
import { validate } from "../utils/index.js";

const router = Router();

router.get("/category", categoryController.findALl);
router.get("/category/:id", categoryController.findOne);
router.post("/category", validate(categorySchema), categoryController.create);
router.put(
  "/category/:id",
  validate(categoryUpdateSchema),
  categoryController.update
);
router.delete("/category/:id", categoryController.delete);

export { router as categoryRouter };
