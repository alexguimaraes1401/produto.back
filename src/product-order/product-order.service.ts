import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductOrderRepository } from './product-order.repository';
import { ICreateProductOrder } from './types/createProductOrder';

@Injectable()
export class ProductOrderService {
  constructor(private readonly productOrderRepository: ProductOrderRepository) {}

  create(data: ICreateProductOrder) {
    return this.productOrderRepository.create(data);
  }

  findAll() {
    return this.productOrderRepository.findAll();
  }

  async findByOrderId(id: number) {
    const productOrder = await this.productOrderRepository.findByOrderId(id);
    if (!productOrder) throw new NotFoundException('Id de pedido não encontrado não encontrado');
    return productOrder;
  }
}
