import z from 'zod';

const UpdateTicketSchema = z.object({
  userId: z.number().int().optional(),
  concertId: z.number().int().optional(),
  seatId: z.number().int().optional(),
  orderId: z.number().int().optional(),
  cartId: z.number().int().optional(),
});

export class UpdateTicketDto {
  public readonly userId?: number;
  public readonly concertId?: number;
  public readonly seatId?: number;
  public readonly orderId?: number;
  public readonly cartId?: number;

  constructor(
    userId?: number,
    concertId?: number,
    seatId?: number,
    orderId?: number,
    cartId?: number,
  ) {
    this.userId = userId;
    this.concertId = concertId;
    this.seatId = seatId;
    this.orderId = orderId;
    this.cartId = cartId;
  }

  static create(object: { [key: string]: any }): [object?, UpdateTicketDto?] {
    const result = UpdateTicketSchema.safeParse(object);

    if (!result.success) {
      const errorMessage = result.error.issues;
      return [errorMessage];
    }

    const { userId, concertId, seatId, orderId, cartId } = result.data;
    return [undefined, new UpdateTicketDto(userId, concertId, seatId, orderId, cartId)];
  }
}
