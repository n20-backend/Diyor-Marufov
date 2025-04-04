import { Router } from "express";
import { productController } from "../controller/index.js";

const router = Router();

router.get("/product", productController.findALl);
router.get("/product/:id", productController.findOne);
router.post("/product", productController.create);
router.put("/product/:id", productController.update);
router.delete("/product/:id", productController.delete);

export { router as productRouter };
