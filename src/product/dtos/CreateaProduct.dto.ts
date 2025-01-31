import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({ required: true })
    name: string;

    @ApiProperty({ required: true })
    categoryId: number;

    @ApiProperty({ required: true })
    descricao?: string;

    @ApiProperty({ required: true })
    price: number;

    @ApiProperty({ required: true })
    qtdStock: number;
}
