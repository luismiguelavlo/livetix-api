import { AuthService } from '../services';
import { CustomError } from '../../domain';
import { Request, Response } from 'express';
import { RegisterUserDto } from '../../domain/dto/auth/register-user.dto';
import { LoginUserDTO } from '../../domain/dto/auth/login-user.dto';

export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ){}

  private handleError = (error: unknown, res: Response) => {
    if( error instanceof CustomError ) {
      return res.status(error.statusCode).json({ message: error.message })
    }

    console.log(error)
    return res.status(500).json({ message: 'Something went very wrong! 🧨' })
  }

  register = (req: Request, res: Response) => {
    const [ error, registerUserDto ] = RegisterUserDto.create(req.body);
    if(error) return res.status(422).json({ message: error });

    this.authService.register(registerUserDto!)
        .then(data => res.status(200).json(data))
        .catch(error => this.handleError(error, res))
  }

  login = (req: Request, res: Response) => {
    const [ error, loginUserDto ] = LoginUserDTO.create(req.body);
    if(error) return res.status(422).json({ message: error });

    this.authService.login(loginUserDto!)
        .then(data => res.status(200).json(data))
        .catch(error => this.handleError(error, res))
  }

  renew = (req: Request, res: Response) => {
    const { sessionUser } = req.body;

    this.authService.renew(sessionUser)
      .then(data => res.status(200).json(data))
      .catch(error => this.handleError(error, res))
  }

}