import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersRepository } from './users.repository';

@Module({
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
  imports: [PrismaModule, JwtModule]
})
export class UsersModule {}
