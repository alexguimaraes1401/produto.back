import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(name: string, pass: string) {
    return this.prisma.user.create({
      data: { name, pass },
    });
  }

  async findByUser(name: string) {
    return this.prisma.user.findUnique({
      where: { name },
    });
  }

  async updateToken(id: number, token: string) {
    return this.prisma.user.update({
      where: { id },
      data: { token },
    });
  }
}
