import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(name: string) {
    return this.prisma.category.create({
      data: { name },
    });
  }

  async findAll() {
    return this.prisma.category.findMany();
  }

  async findById(id: number) {
    return this.prisma.category.findUnique({ where: { id } });
  }

  async update(id: number, name: string) {
    return this.prisma.category.update({
      where: { id },
      data: { name },
    });
  }

  async delete(id: number) {
    return this.prisma.category.delete({ where: { id } });
  }
}
