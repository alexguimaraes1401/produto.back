import { ApiBody, ApiProperty } from '@nestjs/swagger';

export type IProduct = {
    productId: number;
    quantity: number;
}

export class ProductDto {
    @ApiProperty({
        type: 'array',
        items: {
            type: 'object',
            properties: {
                productId: {
                    type: 'number',
                    example: 0
                },
                quantity: {
                    type: 'number',
                    example: 1
                }
            },
            required: ['productId', 'quantity']
        }
    })
    productOrder: IProduct[];
}
