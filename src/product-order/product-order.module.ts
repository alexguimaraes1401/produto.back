import { Module } from '@nestjs/common';
import { ProductOrderService } from './product-order.service';
import { ProductOrderController } from './product-order.controller';

@Module({
  providers: [ProductOrderService],
  controllers: [ProductOrderController]
})
export class ProductOrderModule {}
