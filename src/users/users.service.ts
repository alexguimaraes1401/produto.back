import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly jwtService: JwtService, private readonly repository: UsersRepository) { }

  async cadastrar(name: string, pass: string) {
    if (!name || !pass) throw new HttpException('Erro na requisição.', HttpStatus.BAD_REQUEST)
    const user = await this.repository.findByUser(name)
    if (user) throw new HttpException('Nome de usuário já existe.', HttpStatus.BAD_REQUEST)

    const hashedPassword = await bcrypt.hash(pass, 10);
    const newUser = await this.repository.create(name, hashedPassword);
    const token = await this.jwtService.signAsync({ id: newUser.id, name: newUser.name }, { secret: process.env.JWT_KEY, expiresIn: '24h' });
    await this.repository.updateToken(newUser.id, token)
    return { token }
  }

  async login(name: string, pass: string) {
    if (!name || !pass) throw new HttpException('Erro na requisição.', HttpStatus.BAD_REQUEST)
    const user = await this.repository.findByUser(name);

    if (!user || !(await bcrypt.compare(pass, user.pass))) {
      throw new UnauthorizedException('usuário ou senha inválidas.');
    }

    const token = this.jwtService.sign({ id: user.id, name: user.name }, { secret: process.env.JWT_KEY, expiresIn: '24h' });

    await this.repository.updateToken(user.id, token);

    return { token };
  }
}
