import z from 'zod';


const UpdateCartSchema = z.object({
  userId: z.number().int().optional(),
  isActive: z.boolean().optional(), // Aquí también tipamos los tickets correctamente
});

export class UpdateCartDto {
  public readonly userId?: number;
  public readonly isActive?: boolean;

  constructor(
    userId?: number,
    isActive?: boolean,
  ) {
    this.userId = userId;
    this.isActive = isActive;
  }

  static create(object: { [key: string]: any }): [object?, UpdateCartDto?] {
    const result = UpdateCartSchema.safeParse(object);

    if (!result.success) {
      const errorMessage = result.error.issues;
      return [errorMessage];
    }

    const { userId, isActive } = result.data;
    return [undefined, new UpdateCartDto(userId, isActive)];
  }
}
