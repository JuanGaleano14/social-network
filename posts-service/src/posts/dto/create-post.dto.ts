import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'Contenido del mensaje del post',
    example: '¡Hola mundo!',
  })
  @IsString()
  mensaje: string;
}
