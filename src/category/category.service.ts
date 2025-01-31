import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) { }

  async create(name: string) {
    if (!name) throw new BadRequestException("'name' é obrigatório.")
    const category = await this.categoryRepository.findByName(name.toLocaleLowerCase());
    if (category) throw new BadRequestException("essa categoria já foi criada")
    return this.categoryRepository.create(name.toLocaleLowerCase());
  }

  async findAll() {
    return this.categoryRepository.findAll();
  }

  async findById(id: number) {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new NotFoundException('Categoria não encontrada.');
    }
    return category;
  }

  async update(id: number, name: string) {
    if (!name) throw new BadRequestException("'id' e 'name' é obrigatório.")
    await this.findById(id);
    return this.categoryRepository.update(id, name.toLocaleUpperCase());
  }

  async delete(id: number) {
    await this.findById(id);
    return this.categoryRepository.delete(id);
  }
}
