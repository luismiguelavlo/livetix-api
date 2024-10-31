

import { Router } from 'express';
import { OrderService } from '../services/orders.service';
import { OrderController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';


export class OrderRoutes {
  
  static get routes(): Router {
    const router = Router();

    const orderService = new OrderService();
    const controller = new OrderController(orderService);

    //:::::::::: INIT - AUTH MIDDLEWARE ::::::::::: //
    router.use(AuthMiddleware.protect);
    //:::::::::: END - AUTH MIDDLEWARE ::::::::::: //

    router.get('/users', controller.findUserOrders);

    return router;
  }

}

