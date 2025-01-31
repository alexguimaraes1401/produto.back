import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ProductService, ProductRepository],
  controllers: [ProductController],
  imports: [PrismaModule],
  exports: [ProductService]
})
export class ProductModule { }
