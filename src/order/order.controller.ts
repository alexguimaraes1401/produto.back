import { Controller, Post, Get, Patch, Param, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProductDto } from './dtos/createOrder.dto';
import { UpdateStatusOrderDto } from './dtos/updateStatusOrder.dto';

@ApiTags('Pedidos')
@ApiBearerAuth()
@Controller('pedido')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo pedido.' })
  create(@Body() dto: ProductDto) {
    return this.orderService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todos os pedidos.' })
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar pedido por ID.' })
  findById(@Param('id') id: string) {
    return this.orderService.findById(Number(id));
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Alterar o status do pedido.' })
  statusUpdate(@Param('id') id: string, @Body() { status }: UpdateStatusOrderDto) {
    return this.orderService.statusUpdate(Number(id), status);
  }
}
