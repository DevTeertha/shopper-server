import { Router } from 'express';
import { 
    getUserOrderListController, 
    loginController, 
    placeOrder, 
    registerController, 
    userDetailsController 
} from '../controllers/userController';
import { checkLogin } from '../middlewares/checkLogin';

const userRouter: Router = Router();

userRouter.get('/userDetails', checkLogin, userDetailsController);
userRouter.post('/register', registerController);
userRouter.post('/login', loginController);
userRouter.post('/placeOrder', placeOrder);
userRouter.get('/getOrderList', checkLogin, getUserOrderListController);

export default userRouter;