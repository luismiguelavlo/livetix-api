import { prisma } from "../../data/postgres";

interface PropsCreateTicket {
  concertId: number;
  seatId: number;
  orderId?: number;
  cartId?: number;
  userId?: number;
}

interface PropsAddTicketToCart {
  cartId: number;
  ticketId: number;
  userId: number;
}

export class TicketsService {
  constructor() {}

  async createTickets(data: PropsCreateTicket[]) {
    await prisma.ticket.createMany({
      data: data,
    });
  }

  async updateTickets(data: any) {}

  async findAllSeats() {
    return await prisma.seat.findMany();
  }

  async findTicketsIdBySeatNumber(
    seats: string[],
    concertId: number
  ): Promise<any[]> {
    return await prisma.ticket.findMany({
      where: {
        concertId,
        Seat: {
          number: {
            in: seats, // Usamos el operador "in" para buscar en un grupo de números de asiento
          },
        },
      },
      select: {
        id: true, // Seleccionamos solo el campo id
      },
    });
  }

  async addTicketToCart(data: PropsAddTicketToCart) {
    return await prisma.ticket.update({
      where: {
        id: data.ticketId,
        sold: false,
      },
      data: {
        cartId: data.cartId,
        userId: data.userId,
      },
    });
  }

  async removeTicketFromCart(ticketId: number) {
    return await prisma.ticket.update({
      where: {
        id: ticketId,
      },
      data: {
        cartId: null,
      },
    });
  }
}
