import { CustomError } from "../../domain";
import { CreateCartDto } from "../../domain/dto/cart/create-cart.dto";
import { UpdateCartDto } from "../../domain/dto/cart/update-cart.dto";
import { prisma } from "../../data/postgres";
import { TicketsService } from "./tickets.service";
import { OrderService } from "./orders.service";

interface PropsBuyCart {
  cartId: number;
  userId: number;
}

export class CartService {
  constructor(
    private readonly ticketService: TicketsService,
    private readonly orderService: OrderService
  ) {}

  async create(data: CreateCartDto, userId: number) {
    try {
      let userCart = await prisma.cart.findFirst({
        where: {
          userId: userId,
          isActive: true,
        },
      });

      if (!userCart) {
        userCart = await prisma.cart.create({
          data: {
            userId: userId,
            isActive: true,
          },
        });
      }

      const tickets = await this.ticketService.findTicketsIdBySeatNumber(
        data.seatsNumber,
        data.concertId
      );

      const ticketsId = tickets.map((ticket) => ticket.id);

      console.log(ticketsId);

      const ticketsAdded = ticketsId.map(
        async (ticketId: number) =>
          await this.ticketService.addTicketToCart({
            cartId: userCart.id,
            ticketId: ticketId,
            userId: userId,
          })
      );

      await Promise.all(ticketsAdded);

      return {
        message: "ticket added to cart",
      };
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer(
        "Something went wrong creating the cart"
      );
    }
  }

  async findOne(id: number) {}

  async update(id: number, data: UpdateCartDto) {}

  async delete(id: number) {}

  async buyCart(data: PropsBuyCart) {
    try {
      const cart = await prisma.cart.findUnique({
        where: {
          id: data.cartId,
        },
      });
      if (!cart) throw CustomError.notFound("Cart not found");

      await prisma.cart.update({
        where: {
          id: data.cartId,
        },
        data: {
          isActive: false,
        },
      });

      const tickets = await prisma.ticket.findMany({
        where: {
          cartId: data.cartId,
        },
        include: {
          Concert: true,
        },
      });

      const totalPrice = tickets.reduce(
        (acc, ticket) => acc + ticket.Concert.price,
        0
      );

      await this.orderService.create({
        userId: data.userId,
        totalPrice: totalPrice,
        cartId: data.cartId,
      });

      return {
        message: "carrito comprado satisfactoriamente",
      };
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer(
        "Something went wrong creating the cart"
      );
    }
  }
}
