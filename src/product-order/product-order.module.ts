import { Module } from '@nestjs/common';
import { ProductOrderService } from './product-order.service';
import { ProductOrderRepository } from './product-order.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ProductOrderService, ProductOrderRepository],
  imports: [PrismaModule],
  exports: [ProductOrderService]
})
export class ProductOrderModule {}
