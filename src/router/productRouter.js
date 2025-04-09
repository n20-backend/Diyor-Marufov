import { Router } from "express";
import { productController } from "../controller/index.js";
import { productSchema, productUpdateSchema } from "../validator/index.js";
import { validate } from "../utils/index.js";

const router = Router();

router.get("/product", productController.findALl);
router.get("/product/:id", productController.findOne);
router.post("/product", validate(productSchema), productController.create);
router.put(
  "/product/:id",
  validate(productUpdateSchema),
  productController.update
);
router.delete("/product/:id", productController.delete);

export { router as productRouter };
