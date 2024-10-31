import { Router } from 'express';
import { ConcertsService } from '../services/concerts.service';
import { ConcertController } from './controller';
import { TicketsService } from '../services/tickets.service';



export class ConcertsRoutes {


  static get routes(): Router {

    const router = Router();

    const ticketService = new TicketsService();
    const concertService = new ConcertsService(ticketService);
    const controller = new ConcertController(concertService);
    
    router.post('/', controller.create);
    router.get('/', controller.findAll);
    router.get('/:id', controller.findOne);
    router.patch('/:id', controller.update);
    router.delete('/:id', controller.delete);

    return router;
  }


}

