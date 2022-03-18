import { Router } from 'express';
import { addProductController, deleteProductController, editProductController, getProductsController } from '../controllers/productController';

const productRouter: Router = Router();

productRouter.get("/getProducts", getProductsController);
productRouter.post("/addProduct", addProductController);
productRouter.put("/editProduct", editProductController);
productRouter.delete("/deleteProduct", deleteProductController);

export default productRouter;