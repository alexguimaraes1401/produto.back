import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Order } from '@prisma/client';
import { ICreateOrder } from './types/createOrder';

@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: ICreateOrder): Promise<Order> {
    return this.prisma.order.create({
      data: {
        totalPrice: data.totalPrice,
        status: 'Pendente',
        ProductOrder: {
          create: data.productOrder,
        },
      },
    });
  }

  async findAll(): Promise<Order[]> {
    return this.prisma.order.findMany({
      include: { ProductOrder: true },
    });
  }

  async findById(id: number): Promise<Order | null> {
    return this.prisma.order.findUnique({
      where: { id },
      include: { ProductOrder: true },
    });
  }

  async updateStatus(id: number, status: string): Promise<Order> {
    return this.prisma.order.update({
      where: { id },
      data: { status },
    });
  }
}
