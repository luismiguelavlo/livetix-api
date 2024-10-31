import { prisma } from '../../data/postgres';
import { CustomError } from '../../domain'

interface PropsCreateOrder {
  userId: number;
  totalPrice: number;
  cartId: number;
}

export class OrderService {

  constructor(){}

  async create(data: PropsCreateOrder){
    try {
      await prisma.order.create({
        data
      })

      return true
    } catch (error) {
      console.log(error)
      throw CustomError.internalServer('Something went wrong creating the order');
    }
  }

  async findUserOrders(userId: number){
    return await prisma.order.findMany({
      where: {
        userId
      }
    })
  }

}