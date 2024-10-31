import z from 'zod';

const CreateConcertSchema = z.object({
  name: z.string().min(3),
  genre: z.string().min(3),
  date: z.string(),
  price: z.number().positive(),
})

export class CreateConcertDto {
  public readonly name: string;
  public readonly genre: string;
  public readonly date: string;
  public readonly price: number;

  constructor(
    name: string,
    genre: string,
    date: string,
    price: number
  ) {
    this.name = name;
    this.genre = genre;
    this.date = date;
    this.price = price;
  }

  static create(object: { [key: string]: any }): [object?, CreateConcertDto?] {
    const result = CreateConcertSchema.safeParse(object);

    if (!result.success) {
      const errorMessage = result.error.issues; 
      return [errorMessage];
    }

    const { name, genre, date, price } = result.data;
    return [undefined, new CreateConcertDto(name, genre, date, price)];

  }
}