import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductOrder } from '@prisma/client';
import { ICreateProductOrder } from './types/createProductOrder';

@Injectable()
export class ProductOrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: ICreateProductOrder): Promise<ProductOrder> {
    return this.prisma.productOrder.create({ data });
  }

  async findAll(): Promise<ProductOrder[]> {
    return this.prisma.productOrder.findMany({
      include: { productc: true, order: true },
    });
  }

  async findByOrderId(id: number): Promise<ProductOrder[] | null> {
    return this.prisma.productOrder.findMany({
      where: { orderId: id },
      include: { productc: true },
    });
  }
}
