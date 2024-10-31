import { z } from 'zod';
import { regularExps } from '../../../config';


const RegisterUserSchema = z.object({
  fullname: z.string().min(6),
  email: z.string().email(),
  password: z.string()
    .regex(regularExps.password, 'The password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character')
});

export class RegisterUserDto {
  public readonly fullname: string;
  public readonly email: string;
  public readonly password: string;

  private constructor(
    fullname: string,
    email: string,
    password: string,
  ) {
    this.fullname = fullname;
    this.email = email;
    this.password = password;
  }

  static create(object: { [key: string]: any }): [object?, RegisterUserDto?] {
    const result = RegisterUserSchema.safeParse(object);

    if (!result.success) {
      const errorMessage = result.error.issues; 
      return [errorMessage];
    }

    const { fullname, email, password } = result.data;
    return [undefined, new RegisterUserDto(fullname, email, password)];
  }
}
