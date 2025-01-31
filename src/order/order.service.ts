import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { ProductService } from '../product/product.service';
import { ProductDto } from './dtos/createOrder.dto';
import { ICreateOrder } from './types/createOrder';
import { ProductOrderService } from 'src/product-order/product-order.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productService: ProductService,
    private readonly productOrderService: ProductOrderService
  ) { }

  async create(data: ProductDto) {
    let totalPrice = 0;
    for (const item of data.productOrder) {
      const product = await this.productService.findById(item.productId);
      if (product.qtdStock < item.quantity) {
        throw new BadRequestException(`Produto ${product.name} não tem estoque suficiente.`);
      }
      totalPrice += product.price * item.quantity;
    }

    const newOrder: ICreateOrder = {
      totalPrice,
      productOrder: data.productOrder
    }

    return this.orderRepository.create(newOrder);
  }

  async findAll() {
    const orders = await this.orderRepository.findAll();
    return orders.map(value => ({
      id: value.id,
      totalPrice: value.totalPrice,
      status: value.status,
    }));
  }

  async findById(id: number) {
    const order = await this.orderRepository.findById(id);
    if (!order) throw new NotFoundException('Pedido não encontrado');
    return order;
  }

  async statusUpdate(id: number, status: 'Concluído' | 'Cancelado') {
    if(!status || (status !== 'Concluído' && status !== 'Cancelado')) throw new BadRequestException('O status deve ser "Concluído" ou "Cancelado"');
    const order = await this.findById(id);

    if (order.status === 'Concluído' || order.status === 'Cancelado') {
      throw new BadRequestException('Status não pode ser alterado após ser "Concluído" ou "Cancelado"');
    }

    if (status === 'Concluído') {
      const itens = await this.productOrderService.findByOrderId(id)
      for (const item of itens) {
        const product = await this.productService.findById(item.productId)
        await this.productService.update(item.productId, {
          qtdStock: product.qtdStock - item.quantity
        });
      }
    }

    return this.orderRepository.updateStatus(id, status);
  }
}
