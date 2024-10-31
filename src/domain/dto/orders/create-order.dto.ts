import z from 'zod';

const CreateOrderSchema = z.object({
  userId: z.number().int(),        // Campo requerido
  totalPrice: z.number().positive() // Campo requerido y debe ser un número positivo
});

export class CreateOrderDto {
  public readonly userId: number;
  public readonly totalPrice: number;

  constructor(userId: number, totalPrice: number) {
    this.userId = userId;
    this.totalPrice = totalPrice;
  }

  static create(object: { [key: string]: any }): [object?, CreateOrderDto?] {
    const result = CreateOrderSchema.safeParse(object);

    if (!result.success) {
      const errorMessage = result.error.issues;
      return [errorMessage];
    }

    const { userId, totalPrice } = result.data;
    return [undefined, new CreateOrderDto(userId, totalPrice)];
  }
}
