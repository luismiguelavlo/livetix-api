import { z } from 'zod';


const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export class LoginUserDTO {
  public readonly email: string;
  public readonly password: string;

  private constructor(
    email: string,
    password: string,
  ) {
    this.email = email;
    this.password = password;
  }

  static create(object: { [key: string]: any }): [string?, LoginUserDTO?] {
    const result = LoginUserSchema.safeParse(object);

    if (!result.success) {
      const errorMessage = result.error.errors[0].message; 
      return [errorMessage];
    }

    const { email, password } = result.data;
    return [undefined, new LoginUserDTO(email, password)];
  }
}
