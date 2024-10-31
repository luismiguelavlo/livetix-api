import z from 'zod';

const UpdateOrderSchema = z.object({
  userId: z.number().int().optional(),        // Campo opcional para la actualización
  totalPrice: z.number().positive().optional() // Campo opcional y positivo
});

export class UpdateOrderDto {
  public readonly userId?: number;
  public readonly totalPrice?: number;

  constructor(userId?: number, totalPrice?: number) {
    this.userId = userId;
    this.totalPrice = totalPrice;
  }

  static create(object: { [key: string]: any }): [object?, UpdateOrderDto?] {
    const result = UpdateOrderSchema.safeParse(object);

    if (!result.success) {
      const errorMessage = result.error.issues;
      return [errorMessage];
    }

    const { userId, totalPrice } = result.data;
    return [undefined, new UpdateOrderDto(userId, totalPrice)];
  }
}
