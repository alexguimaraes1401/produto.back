import { Controller, Post, Get, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateProductDto } from './dtos/CreateaProduct.dto';

@ApiTags('Produtos')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('produto')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Criar produto.' })
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todos os produtos.' })
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar produto por ID.' })
  findById(@Param('id') id: string) {
    return this.productService.findById(Number(id));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar produto.' })
  update(@Param('id') id: string, @Body() dto: CreateProductDto) {
    return this.productService.update(Number(id), dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar produto' })
  delete(@Param('id') id: string) {
    return this.productService.delete(Number(id));
  }
}
