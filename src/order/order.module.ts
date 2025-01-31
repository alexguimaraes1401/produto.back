import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrderRepository } from './order.repository';
import { ProductModule } from 'src/product/product.module';
import { ProductOrderModule } from 'src/product-order/product-order.module';

@Module({
  providers: [OrderService, OrderRepository],
  controllers: [OrderController],
  imports: [PrismaModule, ProductModule, ProductOrderModule]
})
export class OrderModule { }
