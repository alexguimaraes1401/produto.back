import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dtos/CreateaProduct.dto';
import { UpdateProductDto } from './dtos/UpdateProduct.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) { }

  async create(data: CreateProductDto) {
    if (!data.name && !data.price) throw new BadRequestException("'name' e 'price' são obrigatorios.")
    const product = await this.productRepository.findByName(data.name);
    if (product) throw new BadRequestException("o produto com esse nome já foi adicionado.")
    return this.productRepository.create(data);
  }

  async findAll() {
    return this.productRepository.findAll();
  }

  async findById(id: number) {
    const product = await this.productRepository.findById(id);
    if (!product) throw new NotFoundException('Produto não encontrado');
    return product;
  }

  async update(id: number, data: UpdateProductDto) {
    await this.findById(id);
    if (data.name) {
      const product = await this.productRepository.findByName(data.name);
      if (product) throw new BadRequestException("o produto com esse nome já foi adicionado.")
    }
    return this.productRepository.update(id, data);
  }

  async delete(id: number) {
    await this.findById(id);
    return this.productRepository.delete(id);
  }
}
