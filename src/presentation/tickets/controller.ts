


import { Request, Response } from 'express';
import { CustomError } from '../../domain';
import { TicketsService } from '../services/tickets.service';

export class TicketController {

  constructor(
    private readonly tocketService: TicketsService
  ){}

  private handleError = (error: unknown, res: Response) => {
    if( error instanceof CustomError ) {
      return res.status(error.statusCode).json({ message: error.message })
    }

    console.log(error)
    return res.status(500).json({ message: 'Something went very wrong! 🧨' })
  }

  removeTiketFromCart = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid id' })

    this.tocketService.removeTicketFromCart(+id)
      .then(result => res.status(200).json(result))
      .catch(error => this.handleError(error, res))
  }

}