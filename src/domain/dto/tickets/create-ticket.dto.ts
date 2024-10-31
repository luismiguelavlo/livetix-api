import z from 'zod';

const CreateTicketSchema = z.object({
  userId: z.number().int(),
  concertId: z.number().int(),
  seatId: z.number().int(),
  orderId: z.number().int(),
  cartId: z.number().int().optional(),  // Opcional, ya que el cart puede no estar presente
});

export class CreateTicketDto {
  public readonly userId: number;
  public readonly concertId: number;
  public readonly seatId: number;
  public readonly orderId: number;
  public readonly cartId?: number;

  constructor(
    userId: number,
    concertId: number,
    seatId: number,
    orderId: number,
    cartId?: number,
  ) {
    this.userId = userId;
    this.concertId = concertId;
    this.seatId = seatId;
    this.orderId = orderId;
    this.cartId = cartId;
  }

  static create(object: { [key: string]: any }): [object?, CreateTicketDto?] {
    const result = CreateTicketSchema.safeParse(object);

    if (!result.success) {
      const errorMessage = result.error.issues;
      return [errorMessage];
    }

    const { userId, concertId, seatId, orderId, cartId } = result.data;
    return [undefined, new CreateTicketDto(userId, concertId, seatId, orderId, cartId)];
  }
}
