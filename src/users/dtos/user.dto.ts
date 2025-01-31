import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  pass: string;
}
