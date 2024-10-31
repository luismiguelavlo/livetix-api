import { Router } from 'express';
import { AuthRoutes } from './auth/route';
import { ConcertsRoutes } from './concerts/routes';
import { TicketRoutes } from './tickets/routes';
import { CartRoutes } from './cart/routes';
import { OrderRoutes } from './orders/routes';


export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    router.use('/auth', AuthRoutes.routes);
    router.use('/concert', ConcertsRoutes.routes);
    router.use('/ticket', TicketRoutes.routes );
    router.use('/cart', CartRoutes.routes );
    router.use('/order', OrderRoutes.routes );

    return router;
  }


}

