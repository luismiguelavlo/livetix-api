import { bcryptAdapter, envs } from '../../config';
import { JwtAdapter } from '../../config/jwt.adapter';
import { prisma } from '../../data/postgres';
import { CustomError } from '../../domain';
import { LoginUserDTO } from '../../domain/dto/auth/login-user.dto';
import { RegisterUserDto } from '../../domain/dto/auth/register-user.dto';
import { EmailService } from './email.service';


export class AuthService {

  constructor(
    private readonly emailService: EmailService,
  ) { }

  public async register (registerUserDto: RegisterUserDto) {

    const userDB = await prisma.user.findUnique({
      where: {
        email: registerUserDto.email,
        status: true
      }
    })

    if (userDB && userDB.status) throw CustomError.badRequest('The email is already registered')
    if (userDB && !userDB.status) {
      await prisma.user.update({
        where: {
          id: userDB.id
        },
        data: {
          status: true
        }
      })
    }

    try {
      const user = await prisma.user.create({
        data: {
          fullname: registerUserDto.fullname,
          email: registerUserDto.email,
          password: bcryptAdapter.hash(registerUserDto.password),
          status: true
        }
      })

      await this.sendEmailValidationLink(user.email)

      return {
        user: {
          id: user.id,
          fullname: user.fullname,
          email: user.email,
          status: user.status,
          role: user.role
        }
      }
    } catch (error) {
      console.log(error)
      throw CustomError.internalServer('Something went wrong')
    }
  }

  public async login (loginUserDTO: LoginUserDTO) {

    const user = await prisma.user.findUnique({ where: { email: loginUserDTO.email } })
    if (!user) throw CustomError.unAuthorized('Invalid email or password');

    const isMatching = bcryptAdapter.compare(loginUserDTO.password, user.password);
    if (!isMatching) throw CustomError.unAuthorized("Invalid credentials")

    const token = await JwtAdapter.generateToken({ id: user.id })
    if (!token) throw CustomError.internalServer('Error while creating JWT')

    return {
      token: token,
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
      }
    }

  }

  private async sendEmailValidationLink (email: string) {
    const token = await JwtAdapter.generateToken({ email })
    if (!token) throw CustomError.internalServer('Error getting token')

    const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;
    const html = `
      <h1>Validate your email</h1>
      <p>Click on the following link to validate your email</p>
      <a href="${link}">Validate your email: ${email}</a>
    `

    const isSent = this.emailService.sendEmail({
      to: email,
      subject: 'Validate your email',
      htmlBody: html
    })
    if (!isSent) throw CustomError.internalServer('Error sending email');

    return true;
  }

  public async validateEmail (token: string) {
    const payload = await JwtAdapter.validateToken(token)
    if (!payload) throw CustomError.unAuthorized('Invalid Token');

    const { email } = payload as { email: string };
    if (!email) throw CustomError.internalServer('Email not in token');

    const user = await prisma.user.findUnique({ where: { email: email } })
    if (!user) throw CustomError.internalServer('Email not exist')


    try {
      await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          emailValidated: true
        }
      })

      return true;
    } catch (error) {
      throw CustomError.internalServer("Something went very wrong");
    }
  }

  public async renew(user: any){

    const token = await JwtAdapter.generateToken({ id: user.id })
    if (!token) throw CustomError.internalServer('Error while creating JWT')

    console.log(user)

    return {
      token: token,
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
      }
    }

  }


}