



import { Request, Response } from 'express';
import { CustomError } from '../../domain';
import { CartService } from '../services/cart.service';
import { CreateCartDto } from '../../domain/dto/cart/create-cart.dto';
import { UpdateCartDto } from '../../domain/dto/cart/update-cart.dto';

export class CartController {

  constructor(
    private readonly cartService: CartService
  ) { }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message })
    }

    console.log(error)
    return res.status(500).json({ message: 'Something went very wrong! 🧨' })
  }

  create = (req: Request, res: Response) => {
    const [error, cart] = CreateCartDto.create(req.body)
    if (error) return this.handleError(error, res)

    this.cartService.create(cart!, req.body.sessionUser.id)
      .then(result => res.status(201).json(result))
      .catch(error => this.handleError(error, res))
  }

  findOne = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid id' })

    this.cartService.findOne(+id)
      .then(cart => res.status(200).json(cart))
      .catch(error => this.handleError(error, res))
  }

  update = (req: Request, res: Response) => {
    const [error, cart] = UpdateCartDto.create(req.body)
    if (error) return this.handleError(error, res)

    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid id' })

    this.cartService.update(+id, cart!)
      .then(result => res.status(200).json(result))
      .catch(error => this.handleError(error, res))
  }

  delete = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid id' })

    this.cartService.delete(+id)
      .then(result => res.status(200).json(result))
      .catch(error => this.handleError(error, res))
  }

  buyCart = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid id' })

    this.cartService.buyCart({
      cartId: id,
      userId: req.body.sessionUser.id
    })
      .then(result => res.status(200).json(result))
      .catch(error => this.handleError(error, res))
  }

}