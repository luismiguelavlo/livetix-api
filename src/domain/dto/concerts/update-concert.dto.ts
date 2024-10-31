import z from 'zod';

const UpdateConcertSchema = z.object({
  name: z.string().min(3).optional(),
  genre: z.string().min(3).optional(),
  date: z.date().optional(),
  price: z.number().positive().optional(),
});

export class UpdateConcertDto {
  public readonly name?: string;
  public readonly genre?: string;
  public readonly date?: Date;
  public readonly price?: number;

  constructor(
    name?: string,
    genre?: string,
    date?: Date,
    price?: number
  ) {
    this.name = name;
    this.genre = genre;
    this.date = date;
    this.price = price;
  }

  static create(object: { [key: string]: any }): [object?, UpdateConcertDto?] {
    const result = UpdateConcertSchema.safeParse(object);

    if (!result.success) {
      const errorMessage = result.error.issues;
      return [errorMessage];
    }

    const { name, genre, date, price } = result.data;
    return [undefined, new UpdateConcertDto(name, genre, date, price)];
  }
}
