

import { Router } from 'express';
import { TicketsService } from '../services/tickets.service';
import { TicketController } from './controller';


export class TicketRoutes {
  
  static get routes(): Router {
    const router = Router();

    const ticketService = new TicketsService();
    const controller = new TicketController(ticketService);
    router.delete('/:id/remove/to-cart', controller.removeTiketFromCart);

    return router;
  }

}

