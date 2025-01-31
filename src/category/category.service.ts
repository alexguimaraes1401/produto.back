import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(name: string) {
    return this.categoryRepository.create(name);
  }

  async findAll() {
    return this.categoryRepository.findAll();
  }

  async findById(id: number) {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async update(id: number, name: string) {
    await this.findById(id); // Verifica se a categoria existe antes de atualizar
    return this.categoryRepository.update(id, name);
  }

  async delete(id: number) {
    await this.findById(id); // Verifica se a categoria existe antes de deletar
    return this.categoryRepository.delete(id);
  }
}
