import { ApiProperty } from "@nestjs/swagger";

export class UpdateStatusOrderDto {
    @ApiProperty({ required: true })
    status: 'Concluído' | 'Cancelado';
}