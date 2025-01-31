import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { ProductOrderModule } from './product-order/product-order.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, PrismaModule, CategoryModule, ProductModule, OrderModule, ProductOrderModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
