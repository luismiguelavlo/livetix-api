

import { Request, Response } from 'express';
import { CustomError } from '../../domain';
import { ConcertsService } from '../services/concerts.service';
import { CreateConcertDto } from '../../domain/dto/concerts/create-concert.dto';
import { UpdateConcertDto } from '../../domain/dto/concerts/update-concert.dto';

export class ConcertController {

  constructor(
    private readonly concertsService: ConcertsService
  ){}

  private handleError = (error: unknown, res: Response) => {
    if( error instanceof CustomError ) {
      return res.status(error.statusCode).json({ message: error.message })
    }

    console.log(error)
    return res.status(500).json({ message: 'Something went very wrong! 🧨' })
  } 

  create = (req: Request, res: Response) => {
    const [error, createConcertDto] = CreateConcertDto.create(req.body);
    if(error) {
      return res.status(422).json({ message: error })
    }
    
    this.concertsService.create(createConcertDto!)
      .then(concert => res.status(201).json(concert))
      .catch(error => this.handleError(error, res))
  }

  findOne = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if(isNaN(id)) return res.status(400).json({ message: 'Invalid id' })

    this.concertsService.findOne(+id)
      .then(concert => res.status(200).json(concert))
      .catch(error => this.handleError(error, res))
  }

  findAll = (req: Request, res: Response) => {
    const { genre } = req.query;

    this.concertsService.findAll(genre as string)
      .then(concerts => res.status(200).json(concerts))
      .catch(error => this.handleError(error, res))
  }

  update = (req: Request, res: Response) => {
    const [error, updateConcertDto] = UpdateConcertDto.create(req.body);
    if(error) {
      return res.status(422).json({ message: error })
    }

    const id = Number(req.params.id);
    if(isNaN(id)) return res.status(400).json({ message: 'Invalid id' })

    this.concertsService.update(+id,updateConcertDto!)
      .then(concert => res.status(200).json(concert))
      .catch(error => this.handleError(error, res))
  }
  
  delete = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if(isNaN(id)) return res.status(400).json({ message: 'Invalid id' })
    
    this.concertsService.delete(+id)
      .then(() => res.status(200).json({ message: 'Concert deleted successfully' }))
      .catch(error => this.handleError(error, res))
  }

}