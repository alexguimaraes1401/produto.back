import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/createCategory.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Categorias')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Post()
    @ApiOperation({ summary: 'Adicionar catogoria.' })
    create(@Body() dto: CreateCategoryDto) {
        return this.categoryService.create(dto.name);
    }

    @Get()
    @ApiOperation({ summary: 'Buscar todas as categorias.' })
    @ApiResponse({ status: 200, description: 'Busca realizada com sucesso.' })
    findAll() {
        return this.categoryService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar categoria por ID.' })
    findById(@Param('id') id: string) {
        return this.categoryService.findById(Number(id));
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Atualizar categoria' })
    update(@Param('id') id: string, @Body() dto: CreateCategoryDto) {
        return this.categoryService.update(Number(id), dto.name);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Deletar categoria' })
    delete(@Param('id') id: string) {
        return this.categoryService.delete(Number(id));
    }
}

