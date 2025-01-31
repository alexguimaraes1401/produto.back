import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@ApiTags('Usuários')
@Controller('usuario')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('cadastrar')
  @ApiOperation({ summary: 'Criar Usuario.' })
  @ApiResponse({ status: 201, description: 'Usuário criado.' })
  @ApiResponse({ status: 400, description: 'Erro ao criar o usuário.' })
  cadastrar(@Body() user: UserDto) {
    return this.usersService.cadastrar(user.name, user.pass);
  }

  @Post('logar')
  @ApiOperation({ summary: 'Acessar conta.' })
  @ApiResponse({ status: 201, description: 'Login efetuado.' })
  @ApiResponse({ status: 400, description: 'Erro ao fazer login.' })
  logar(@Body() user: UserDto) {
    return this.usersService.login(user.name, user.pass);
  }
}
