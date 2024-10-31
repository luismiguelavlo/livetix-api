import { CustomError } from "../../domain";
import { CreateConcertDto } from "../../domain/dto/concerts/create-concert.dto";
import { UpdateConcertDto } from "../../domain/dto/concerts/update-concert.dto";
import { prisma } from "../../data/postgres";
import { TicketsService } from "./tickets.service";

export class ConcertsService {
  constructor(private readonly ticketService: TicketsService) {}

  async create(createConcertDto: CreateConcertDto) {
    try {
      const concert = await prisma.concert.create({
        data: {
          name: createConcertDto.name,
          genre: createConcertDto.genre,
          date: new Date(createConcertDto.date),
          price: createConcertDto.price,
        },
      });

      const seats = await this.ticketService.findAllSeats();

      const tickets = seats.map((seat) => {
        return {
          concertId: concert.id,
          seatId: seat.id,
        };
      });

      await this.ticketService.createTickets(tickets);

      return concert;
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer(
        "Something went wrong creating the concert"
      );
    }
  }

  async findAll(genre?: string) {
    if (genre === "undefined") {
      genre = undefined;
    }
    const whereClause = genre ? { genre } : undefined;
    console.log(whereClause);

    return await prisma.concert.findMany({
      where: whereClause,
    });
  }

  async findOne(id: number) {
    const concert = await prisma.concert.findUnique({
      where: { id },
      include: {
        tickets: {
          include: {
            Seat: true,
          },
        },
      },
    });

    if (!concert) throw CustomError.notFound("Concert not found");

    return concert;
  }

  async update(id: number, updateConcertDto: UpdateConcertDto) {
    await this.findOne(id);

    try {
      const concert = await prisma.concert.update({
        where: { id },
        data: {
          name: updateConcertDto.name,
          genre: updateConcertDto.genre,
          price: updateConcertDto.price,
        },
      });

      return concert;
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer(
        "Something went wrong updating the concert"
      );
    }
  }

  async delete(id: number) {
    return "not yet implemented";
  }
}
