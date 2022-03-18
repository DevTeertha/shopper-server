import { Router } from 'express';
import { changeOrderStatusController, getOrderController } from '../controllers/orderController';

const orderRouter: Router = Router();

orderRouter.get("/getAllOrders", getOrderController);
orderRouter.put("/changeStatus", changeOrderStatusController);

export default orderRouter;