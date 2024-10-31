import { Router } from 'express';
import { EmailService } from '../services/email.service';
import { envs } from '../../config/envs';
import { AuthService } from '../services';
import { AuthController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';



export class AuthRoutes {

  static get routes (): Router {
    const router = Router();

    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
      envs.SEND_EMAIL
    )
    const authService = new AuthService(emailService);
    const controller = new AuthController(authService);

    router.post('/register', controller.register);
    router.post('/login', controller.login);
    router.use(AuthMiddleware.protect)
    router.get('/renew', controller.renew)



    return router;
  }

}