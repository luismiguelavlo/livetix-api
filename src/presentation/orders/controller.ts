


import { Request, Response } from 'express';
import { CustomError } from '../../domain';
import { OrderService } from '../services/orders.service';

export class OrderController {

  constructor(
    private readonly orderService: OrderService
  ){}

  private handleError = (error: unknown, res: Response) => {
    if( error instanceof CustomError ) {
      return res.status(error.statusCode).json({ message: error.message })
    }

    console.log(error)
    return res.status(500).json({ message: 'Something went very wrong! 🧨' })
  }

  findUserOrders = (req: Request, res: Response) => {
    const userId = req.body.sessionUser.id;
    if (!userId) return res.status(400).json({ message: 'Invalid userId' })

    this.orderService.findUserOrders(userId)
      .then(result => res.status(200).json(result))
      .catch(error => this.handleError(error, res))
  }

}