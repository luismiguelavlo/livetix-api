
import { Router } from 'express';
import { CartController } from './controller';
import { CartService } from '../services/cart.service';
import { TicketsService } from '../services/tickets.service';
import { OrderService } from '../services/orders.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';



export class CartRoutes {


  static get routes(): Router {

    const router = Router();

    const ticketService = new TicketsService();
    const orderService = new OrderService();
    const cartService = new CartService(ticketService, orderService);
    const controller = new CartController(cartService);

    //:::::::::: INIT - AUTH MIDDLEWARE ::::::::::: //
    router.use(AuthMiddleware.protect);
    //:::::::::: END - AUTH MIDDLEWARE ::::::::::: //

    router.post('/', controller.create);
    router.get('/:id', controller.findOne);
    router.patch('/:id', controller.update);
    router.delete('/:id', controller.delete);
    router.post('/:id/buy-cart', controller.buyCart);

    return router;
  }


}

