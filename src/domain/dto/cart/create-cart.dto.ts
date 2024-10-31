import z from "zod";

const CreateCartSchema = z.object({
  isActive: z.boolean().optional(),
  seatsNumber: z.array(z.string()), // Ahora seatsNumber es un array de números enteros
  concertId: z.number(),
});

export class CreateCartDto {
  public readonly isActive?: boolean;
  public readonly seatsNumber: string[]; // Cambiamos ticketId a seatsNumber, que es un array de números
  public readonly concertId: number;

  constructor(
    seatsNumber: string[], // Ahora recibe un array de números
    concertId: number,
    isActive?: boolean
  ) {
    this.isActive = isActive ?? true;
    this.concertId = concertId;
    this.seatsNumber = seatsNumber;
  }

  static create(object: { [key: string]: any }): [object?, CreateCartDto?] {
    const result = CreateCartSchema.safeParse(object);

    if (!result.success) {
      const errorMessage = result.error.issues;
      return [errorMessage];
    }

    const { seatsNumber, concertId, isActive } = result.data;
    return [undefined, new CreateCartDto(seatsNumber, concertId, isActive)];
  }
}
