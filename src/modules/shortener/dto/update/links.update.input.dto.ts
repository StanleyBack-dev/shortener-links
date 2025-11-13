import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, MinLength, MaxLength } from 'class-validator';

export class DtoUpdateLinkInput {
  @ApiProperty({
    example: 'https://meusite.com/novo-destino',
    description: 'Novo endereço de destino para o link encurtado',
  })
  @IsString()
  @IsUrl({}, { message: 'Informe uma URL válida' })
  @MinLength(10, { message: 'A URL deve ter pelo menos 10 caracteres' })
  @MaxLength(2048, { message: 'A URL não pode ultrapassar 2048 caracteres' })
  url: string;
}